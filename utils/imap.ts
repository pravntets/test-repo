import Imap from 'imap';

interface EmailMessage {
  from: string;
  to?: string;
  subject: string;
  date: string;
}

async function openInbox(imap: Imap): Promise<any> { 
  return new Promise((resolve, reject) => {
    imap.openBox('INBOX', true, (err, box) => {
      if (err) return reject(err);
      resolve(box);
    });
  });
}

export async function checkEmail(): Promise<EmailMessage | null> {
  const imapServer = 'imap.gmail.com';
  const imapPort = 993;
  const email = "zorosungjinwoo@gmail.com";
  const password = "jpgjuoutxrtzzmvz";

  const imapConfig = {
    user: email,
    password: password,
    host: imapServer,
    port: imapPort,
    tls: true,
    tlsOptions: {
      rejectUnauthorized: false, 
    },
  };

  try {
    const imap = new Imap(imapConfig);

    await new Promise<void>((resolve, reject) => {
      imap.once('ready', resolve);
      imap.once('error', reject);
      imap.connect();
    });

    const box = await openInbox(imap);

    const latestMessageId = box.messages.total;
    const fetch = imap.seq.fetch(latestMessageId, {
      bodies: 'HEADER.FIELDS (FROM TO SUBJECT DATE),',
      struct: true,
    });

    return new Promise<EmailMessage | null>((resolve, reject) => {
      fetch.on('message', (msg) => {
        msg.on('body', (stream) => {
          let buffer = '';
          stream.on('data', (chunk) => {
            buffer += chunk.toString('utf8');
          });
          stream.once('end', () => {
            try {
              const header = Imap.parseHeader(buffer);
              const message: EmailMessage = {
                from: header.from?.[0] || '',
                to: header.to?.[0] || '',
                subject: header.subject?.[0] || '',
                date: header.date?.[0] || '',
              };
              resolve(message);
              imap.end();
            } catch (err) {
              reject('Error parsing email header: ' + err);
            }
          });
        });
      });

      fetch.once('error', (err) => {
        reject('Fetch error: ' + err);
        imap.end();
      });

      fetch.once('end', () => {
        resolve(null);
        imap.end();
      });
    });

  } catch (error) {
    console.error('Error:', error.message || error);
    return null;
  }
} 
