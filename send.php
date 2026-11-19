<?php
/**
 * CMT Engineering: contact form handler.
 * Receives the form on /contact-us/ and emails it to the address below.
 * Works on any host with PHP mail() enabled (most cPanel hosts).
 */

// ---- Settings ----------------------------------------------------------
$TO        = 'rudolph@cmtengineering.co.za';
$FROM      = 'website@cmtengineering.co.za';   // should be a mailbox on the site's own domain
$SUBJECT   = 'Website enquiry';
// ------------------------------------------------------------------------

header('Content-Type: application/json; charset=utf-8');
header('X-Content-Type-Options: nosniff');

function reply($ok, $error = '') {
    if (!$ok) http_response_code($error === 'method' ? 405 : 400);
    echo json_encode(['ok' => $ok, 'error' => $error]);
    exit;
}

if (($_SERVER['REQUEST_METHOD'] ?? '') !== 'POST') reply(false, 'method');

// Spam traps: hidden field must stay empty, and the form must have been open a few seconds
if (!empty($_POST['website'])) reply(true);
$ts = isset($_POST['ts']) ? (int) $_POST['ts'] : 0;
if ($ts > 0 && (round(microtime(true) * 1000) - $ts) < 2500) reply(true);

$clean = function ($key, $max) {
    $v = isset($_POST[$key]) ? (string) $_POST[$key] : '';
    $v = trim(str_replace("\0", '', $v));
    return mb_substr($v, 0, $max);
};
$oneLine = function ($v) { return trim(preg_replace('/[\r\n\t]+/', ' ', $v)); };

$name    = $oneLine($clean('your_name', 120));
$email   = $oneLine($clean('your_email', 160));
$phone   = $oneLine($clean('your_phone', 40));
$office  = $oneLine($clean('office', 60));
$message = $clean('message', 5000);

if (mb_strlen($name) < 2)                                   reply(false, 'name');
if (!filter_var($email, FILTER_VALIDATE_EMAIL))             reply(false, 'email');
if (strlen(preg_replace('/\D/', '', $phone)) < 7)           reply(false, 'phone');
if (mb_strlen($message) < 3)                                reply(false, 'message');
if (!in_array($office, ['Head Office (Pretoria)', 'Botswana (Maun)'], true)) $office = 'Not specified';

$body  = "New message from the CMT Engineering website\n";
$body .= "------------------------------------------------\n\n";
$body .= "Name:    $name\n";
$body .= "Email:   $email\n";
$body .= "Phone:   $phone\n";
$body .= "Office:  $office\n\n";
$body .= "Message:\n$message\n\n";
$body .= "------------------------------------------------\n";
$body .= 'Sent ' . date('j F Y, H:i') . ' from ' . ($_SERVER['HTTP_HOST'] ?? 'the website') . "\n";

$subject = '=?UTF-8?B?' . base64_encode($SUBJECT . ': ' . $name) . '?=';
$headers  = "From: CMT Engineering Website <$FROM>\r\n";
$headers .= "Reply-To: $email\r\n";
$headers .= "MIME-Version: 1.0\r\n";
$headers .= "Content-Type: text/plain; charset=UTF-8\r\n";
$headers .= "Content-Transfer-Encoding: 8bit\r\n";

$sent = @mail($TO, $subject, $body, $headers, '-f' . $FROM);
reply((bool) $sent, $sent ? '' : 'mail');
