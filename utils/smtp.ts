import * as tls from 'tls';

export async function sendEmail() {
  const smtpServer = 'smtp.gmail.com';
  const smtpPort = 587;
  const email = 'zorosungjinwoo@gmail.com';
  const password = 'jpgjuoutxrtzzmvz'; 

  const options = {
    host: smtpServer,
    port: smtpPort,
    secure: false, 
  };

  const socket = tls.connect(options, () => {
    console.log('Connected to SMTP server');
    socket.write('EHLO localhost\r\n');

    socket.write('AUTH LOGIN\r\n');
    socket.write(Buffer.from(email).toString('base64') + '\r\n'); 
    socket.write(Buffer.from(password).toString('base64') + '\r\n');

    socket.write('MAIL FROM:<zorosungjinwoo@gmail.com>\r\n');
    socket.write('RCPT TO:<zorosungjinwoo@gmail.com>\r\n');
    socket.write('DATA\r\n');
    socket.write('Subject: Test Email from Playwright\r\n');
    socket.write('This is a test email sent from Playwright\r\n');
    socket.write('.\r\n'); 
    socket.write('QUIT\r\n');
  });

  socket.on('data', (data) => {
    console.log('SMTP server response:', data.toString());
  });

  socket.on('end', () => {
    console.log('SMTP connection closed');
  });

  socket.on('error', (err) => {
    console.log('Error:', err.message);
  });
}