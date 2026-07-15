<?php
declare(strict_types=1);

/**
 * Endpoint del formulario de contacto de pccintegrity.com
 * Recibe JSON desde src/pages/Contact.jsx y envía la solicitud por correo.
 */

header('Content-Type: application/json; charset=utf-8');
header('X-Content-Type-Options: nosniff');

const RECIPIENTS  = 'a.rivera@proteccioncatodica.com, pablo.rivera@proteccioncatodica.com';
const FROM_ADDR   = 'noreply@pccintegrity.com';
const MAX_MESSAGE = 5000;

if (($_SERVER['REQUEST_METHOD'] ?? '') !== 'POST') {
    http_response_code(405);
    echo json_encode(['ok' => false, 'error' => 'method_not_allowed']);
    exit;
}

$data = json_decode((string)file_get_contents('php://input'), true);
if (!is_array($data)) {
    $data = $_POST;
}

$field = static function (string $key) use ($data): string {
    return trim((string)($data[$key] ?? ''));
};

// Honeypot: los bots rellenan campos ocultos. Fingimos éxito y descartamos.
if ($field('website') !== '') {
    echo json_encode(['ok' => true]);
    exit;
}

$first   = $field('first');
$last    = $field('last');
$email   = $field('email');
$company = $field('company');
$subject = $field('subject');
$message = $field('message');

$invalid = [];
if ($first === '')   { $invalid[] = 'first'; }
if ($last === '')    { $invalid[] = 'last'; }
if ($message === '') { $invalid[] = 'message'; }
if ($email === '' || !filter_var($email, FILTER_VALIDATE_EMAIL)) { $invalid[] = 'email'; }

if ($invalid !== []) {
    http_response_code(422);
    echo json_encode(['ok' => false, 'error' => 'invalid', 'fields' => $invalid]);
    exit;
}

// Cualquier valor que llegue a una cabecera no puede contener saltos de línea.
$noBreaks = static function (string $value): string {
    return trim(str_replace(["\r", "\n", "\t"], ' ', $value));
};

$first   = mb_substr($noBreaks($first), 0, 100);
$last    = mb_substr($noBreaks($last), 0, 100);
$email   = mb_substr($noBreaks($email), 0, 200);
$company = mb_substr($noBreaks($company), 0, 150);
$subject = mb_substr($noBreaks($subject), 0, 150);
$message = mb_substr($message, 0, MAX_MESSAGE);

$name  = $first . ' ' . $last;
$title = 'Nueva solicitud web — ' . $name . ($subject !== '' ? ' — ' . $subject : '');
$title = function_exists('mb_encode_mimeheader')
    ? mb_encode_mimeheader($title, 'UTF-8')
    : $title;

$body = implode("\n", [
    'Nueva solicitud desde pccintegrity.com',
    str_repeat('=', 40),
    '',
    'Nombre:  ' . $name,
    'Correo:  ' . $email,
    'Empresa: ' . ($company !== '' ? $company : '—'),
    'Asunto:  ' . ($subject !== '' ? $subject : '—'),
    '',
    'Mensaje:',
    '--------',
    $message,
    '',
    str_repeat('=', 40),
    'Fecha: ' . date('Y-m-d H:i:s'),
    'IP:    ' . ($_SERVER['REMOTE_ADDR'] ?? '—'),
]);

// From debe ser del propio dominio (SPF). El correo del cliente va en Reply-To.
$headers = implode("\r\n", [
    'From: PCC Integrity Web <' . FROM_ADDR . '>',
    'Reply-To: ' . $name . ' <' . $email . '>',
    'MIME-Version: 1.0',
    'Content-Type: text/plain; charset=UTF-8',
    'Content-Transfer-Encoding: 8bit',
]);

$sent = mail(RECIPIENTS, $title, $body, $headers, '-f' . FROM_ADDR);

if (!$sent) {
    error_log('[contact.php] mail() falló para ' . $email);
    http_response_code(500);
    echo json_encode(['ok' => false, 'error' => 'send_failed']);
    exit;
}

echo json_encode(['ok' => true]);
