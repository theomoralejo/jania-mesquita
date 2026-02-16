import transporter, { emailConfig } from '../config/smtp';

// ===========================
// TEMPLATES HTML
// ===========================

const emailTemplate = (content: string) => `
<!DOCTYPE html>
<html lang="pt-BR">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Jania Mesquita</title>
</head>
<body style="margin: 0; padding: 0; font-family: Arial, sans-serif; background-color: #f4f4f4;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #f4f4f4; padding: 20px 0;">
    <tr>
      <td align="center">
        <table width="600" cellpadding="0" cellspacing="0" style="background-color: #ffffff; border-radius: 8px; overflow: hidden; box-shadow: 0 2px 8px rgba(0,0,0,0.1);">
          <!-- Header -->
          <tr>
            <td style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 40px 30px; text-align: center;">
              <h1 style="color: #ffffff; margin: 0; font-size: 28px; font-weight: bold;">Jania Mesquita</h1>
              <p style="color: #f0f0f0; margin: 10px 0 0 0; font-size: 14px;">Gestão em Saúde & Liderança</p>
            </td>
          </tr>

          <!-- Content -->
          <tr>
            <td style="padding: 40px 30px;">
              ${content}
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="background-color: #f9f9f9; padding: 30px; text-align: center; border-top: 1px solid #eeeeee;">
              <p style="margin: 0 0 10px 0; color: #666666; font-size: 14px;">
                <strong>Jania Mesquita</strong>
              </p>
              <p style="margin: 0 0 10px 0; color: #999999; font-size: 12px;">
                Médica | Consultora em Gestão de Saúde | Palestrante
              </p>
              <p style="margin: 0; color: #999999; font-size: 12px;">
                © ${new Date().getFullYear()} Jania Mesquita. Todos os direitos reservados.
              </p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>
`;

// ===========================
// FUNÇÕES DE ENVIO
// ===========================

// Notificação Admin - Novo Contato
export const notifyNewContato = async (data: {
  name: string;
  email: string;
  phone?: string;
  subject: string;
  message: string;
}) => {
  try {
    const content = `
      <h2 style="color: #333333; margin: 0 0 20px 0;">Novo Contato Recebido</h2>
      <p style="color: #666666; line-height: 1.6; margin: 0 0 20px 0;">
        Você recebeu uma nova mensagem através do formulário de contato do site.
      </p>

      <table width="100%" cellpadding="8" style="border-collapse: collapse; margin: 20px 0;">
        <tr style="background-color: #f9f9f9;">
          <td style="border: 1px solid #eeeeee; font-weight: bold; color: #333333; width: 120px;">Nome:</td>
          <td style="border: 1px solid #eeeeee; color: #666666;">${data.name}</td>
        </tr>
        <tr>
          <td style="border: 1px solid #eeeeee; font-weight: bold; color: #333333;">Email:</td>
          <td style="border: 1px solid #eeeeee; color: #666666;">${data.email}</td>
        </tr>
        ${data.phone ? `
        <tr style="background-color: #f9f9f9;">
          <td style="border: 1px solid #eeeeee; font-weight: bold; color: #333333;">Telefone:</td>
          <td style="border: 1px solid #eeeeee; color: #666666;">${data.phone}</td>
        </tr>
        ` : ''}
        <tr ${!data.phone ? 'style="background-color: #f9f9f9;"' : ''}>
          <td style="border: 1px solid #eeeeee; font-weight: bold; color: #333333;">Assunto:</td>
          <td style="border: 1px solid #eeeeee; color: #666666;">${data.subject}</td>
        </tr>
      </table>

      <div style="background-color: #f9f9f9; padding: 20px; border-radius: 6px; margin: 20px 0;">
        <p style="margin: 0 0 10px 0; font-weight: bold; color: #333333;">Mensagem:</p>
        <p style="margin: 0; color: #666666; line-height: 1.6; white-space: pre-wrap;">${data.message}</p>
      </div>

      <p style="color: #999999; font-size: 12px; margin: 20px 0 0 0;">
        <em>Esta é uma notificação automática do sistema.</em>
      </p>
    `;

    await transporter.sendMail({
      from: emailConfig.from,
      to: emailConfig.notificationEmail,
      subject: `[Site] Novo Contato: ${data.subject}`,
      html: emailTemplate(content),
    });

    console.log('✅ Email de notificação enviado para admin');
    return { success: true };
  } catch (error) {
    console.error('❌ Erro ao enviar email de notificação:', error);
    throw error;
  }
};

// Confirmação para o Usuário - Contato
export const sendContatoConfirmation = async (name: string, email: string) => {
  try {
    const content = `
      <h2 style="color: #333333; margin: 0 0 20px 0;">Olá, ${name}!</h2>
      <p style="color: #666666; line-height: 1.6; margin: 0 0 20px 0;">
        Obrigada por entrar em contato! Recebi sua mensagem e retornarei o mais breve possível.
      </p>

      <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 20px; border-radius: 6px; margin: 20px 0;">
        <p style="color: #ffffff; margin: 0; font-size: 16px; text-align: center;">
          <strong>Respondo geralmente em até 24-48 horas</strong>
        </p>
      </div>

      <p style="color: #666666; line-height: 1.6; margin: 20px 0 0 0;">
        Enquanto isso, convido você a conhecer mais sobre meu trabalho:
      </p>

      <table width="100%" cellpadding="0" cellspacing="0" style="margin: 20px 0;">
        <tr>
          <td style="padding: 10px 0;">
            <a href="https://janiamesquita.com.br/blog" style="color: #667eea; text-decoration: none; font-weight: bold;">📝 Blog - Artigos sobre Gestão em Saúde</a>
          </td>
        </tr>
        <tr>
          <td style="padding: 10px 0;">
            <a href="https://janiamesquita.com.br/palestras" style="color: #667eea; text-decoration: none; font-weight: bold;">🎤 Palestras e Workshops</a>
          </td>
        </tr>
        <tr>
          <td style="padding: 10px 0;">
            <a href="https://janiamesquita.com.br/acervo" style="color: #667eea; text-decoration: none; font-weight: bold;">📚 Acervo - Livros e Materiais</a>
          </td>
        </tr>
      </table>

      <p style="color: #666666; line-height: 1.6; margin: 30px 0 0 0;">
        Atenciosamente,<br>
        <strong>Jania Mesquita</strong>
      </p>
    `;

    await transporter.sendMail({
      from: emailConfig.from,
      to: email,
      subject: 'Confirmação de Contato - Jania Mesquita',
      html: emailTemplate(content),
    });

    console.log(`✅ Email de confirmação enviado para ${email}`);
    return { success: true };
  } catch (error) {
    console.error('❌ Erro ao enviar email de confirmação:', error);
    throw error;
  }
};

// Notificação Admin - Novo Diagnóstico
export const notifyNewDiagnostico = async (data: {
  name: string;
  email: string;
  phone: string;
  clinic: string;
  revenue: string;
  mainChallenge?: string;
}) => {
  try {
    const content = `
      <h2 style="color: #333333; margin: 0 0 20px 0;">Nova Solicitação de Diagnóstico</h2>
      <p style="color: #666666; line-height: 1.6; margin: 0 0 20px 0;">
        Um novo diagnóstico foi solicitado através do site.
      </p>

      <table width="100%" cellpadding="8" style="border-collapse: collapse; margin: 20px 0;">
        <tr style="background-color: #f9f9f9;">
          <td style="border: 1px solid #eeeeee; font-weight: bold; color: #333333; width: 140px;">Nome:</td>
          <td style="border: 1px solid #eeeeee; color: #666666;">${data.name}</td>
        </tr>
        <tr>
          <td style="border: 1px solid #eeeeee; font-weight: bold; color: #333333;">Email:</td>
          <td style="border: 1px solid #eeeeee; color: #666666;">${data.email}</td>
        </tr>
        <tr style="background-color: #f9f9f9;">
          <td style="border: 1px solid #eeeeee; font-weight: bold; color: #333333;">Telefone:</td>
          <td style="border: 1px solid #eeeeee; color: #666666;">${data.phone}</td>
        </tr>
        <tr>
          <td style="border: 1px solid #eeeeee; font-weight: bold; color: #333333;">Clínica:</td>
          <td style="border: 1px solid #eeeeee; color: #666666;">${data.clinic}</td>
        </tr>
        <tr style="background-color: #f9f9f9;">
          <td style="border: 1px solid #eeeeee; font-weight: bold; color: #333333;">Faturamento:</td>
          <td style="border: 1px solid #eeeeee; color: #666666;">${data.revenue}</td>
        </tr>
      </table>

      ${data.mainChallenge ? `
      <div style="background-color: #f9f9f9; padding: 20px; border-radius: 6px; margin: 20px 0;">
        <p style="margin: 0 0 10px 0; font-weight: bold; color: #333333;">Principal Desafio:</p>
        <p style="margin: 0; color: #666666; line-height: 1.6; white-space: pre-wrap;">${data.mainChallenge}</p>
      </div>
      ` : ''}
    `;

    await transporter.sendMail({
      from: emailConfig.from,
      to: emailConfig.notificationEmail,
      subject: '[Site] Nova Solicitação de Diagnóstico',
      html: emailTemplate(content),
    });

    console.log('✅ Email de diagnóstico enviado para admin');
    return { success: true };
  } catch (error) {
    console.error('❌ Erro ao enviar email de diagnóstico:', error);
    throw error;
  }
};

// Notificação Admin - Nova Avaliação/Quiz
export const notifyNewAvaliacao = async (data: {
  name: string;
  email: string;
  phone: string;
  position: string;
  revenue: string;
  employees: string;
  operationTime: string;
  totalScore: number;
  maturityLevel: string;
}) => {
  try {
    const content = `
      <h2 style="color: #333333; margin: 0 0 20px 0;">Nova Avaliação de Maturidade Concluída</h2>

      <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 20px; border-radius: 6px; margin: 20px 0; text-align: center;">
        <p style="color: #ffffff; margin: 0; font-size: 18px;">
          <strong>Score: ${data.totalScore} pontos</strong>
        </p>
        <p style="color: #f0f0f0; margin: 10px 0 0 0; font-size: 16px;">
          ${data.maturityLevel}
        </p>
      </div>

      <table width="100%" cellpadding="8" style="border-collapse: collapse; margin: 20px 0;">
        <tr style="background-color: #f9f9f9;">
          <td style="border: 1px solid #eeeeee; font-weight: bold; color: #333333; width: 140px;">Nome:</td>
          <td style="border: 1px solid #eeeeee; color: #666666;">${data.name}</td>
        </tr>
        <tr>
          <td style="border: 1px solid #eeeeee; font-weight: bold; color: #333333;">Email:</td>
          <td style="border: 1px solid #eeeeee; color: #666666;">${data.email}</td>
        </tr>
        <tr style="background-color: #f9f9f9;">
          <td style="border: 1px solid #eeeeee; font-weight: bold; color: #333333;">Telefone:</td>
          <td style="border: 1px solid #eeeeee; color: #666666;">${data.phone}</td>
        </tr>
        <tr>
          <td style="border: 1px solid #eeeeee; font-weight: bold; color: #333333;">Cargo:</td>
          <td style="border: 1px solid #eeeeee; color: #666666;">${data.position}</td>
        </tr>
        <tr style="background-color: #f9f9f9;">
          <td style="border: 1px solid #eeeeee; font-weight: bold; color: #333333;">Faturamento:</td>
          <td style="border: 1px solid #eeeeee; color: #666666;">${data.revenue}</td>
        </tr>
        <tr>
          <td style="border: 1px solid #eeeeee; font-weight: bold; color: #333333;">Funcionários:</td>
          <td style="border: 1px solid #eeeeee; color: #666666;">${data.employees}</td>
        </tr>
        <tr style="background-color: #f9f9f9;">
          <td style="border: 1px solid #eeeeee; font-weight: bold; color: #333333;">Tempo Operação:</td>
          <td style="border: 1px solid #eeeeee; color: #666666;">${data.operationTime}</td>
        </tr>
      </table>
    `;

    await transporter.sendMail({
      from: emailConfig.from,
      to: emailConfig.notificationEmail,
      subject: '[Site] Nova Avaliação de Maturidade',
      html: emailTemplate(content),
    });

    console.log('✅ Email de avaliação enviado para admin');
    return { success: true };
  } catch (error) {
    console.error('❌ Erro ao enviar email de avaliação:', error);
    throw error;
  }
};

export default {
  notifyNewContato,
  sendContatoConfirmation,
  notifyNewDiagnostico,
  notifyNewAvaliacao,
};
