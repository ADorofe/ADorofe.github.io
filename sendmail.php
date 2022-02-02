<?php
    use PHPMailer\PHPMailer\PHPMailer;
    use PHPMailer\PHPMailer\Exception;

    require'libs/phpmailer/src/Exception.php';
    require'libs/phpmailer/src/PHPMailer.php';

    $mail = new PHPMailer(true);
    $mail->CharSet = 'UTF-8';
    $mail->setLanguage('ru', 'libs/phpmailer/language');
    $mail->isHTML(true);

    $mail->setFrom('from@gmail.com', 'Site Elite');
    $mail->addAddress('from@gmail.com');
    $mail->Subject = 'Форма обратной связи';

    $body='<h1>Обратная связь</h1>';
    if(trim(!empty($_POST['email']))){
        $body.='<p><strong>E-mail: </strong>'.$_POST['email'].'</p>';
    }
    if(trim(!empty($_POST['email']))){
        $body.='<p><strong>Phone: </strong>'.$_POST['phone'].'</p>';
    }
    if(trim(!empty($_POST['message']))){
        $body.='<p><strong>Message: </strong>'.$_POST['message'].'</p>';
    }
    $mail->Body = $body;

    try{
        $mail->send();
        $message = 'Данные отправлены!';
    } catch (Exception $e) {
        $message = 'Ошибка!';
    }

    $response = ['message' => $message];

    header('Content-type: application/json');
    echo json_encode($response);
?>