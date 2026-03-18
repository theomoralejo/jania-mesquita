import { Request, Response } from 'express';
import prisma from '../config/database';
import { AuthRequest } from '../middleware/auth';
import * as emailService from '../services/email.service';

// ===========================
// ENDPOINTS PÚBLICOS (SUBMISSIONS)
// ===========================

// Contato
export const submitContato = async (req: Request, res: Response): Promise<void> => {
  try {
    const { name, email, phone, subject, message } = req.body;

    if (!name || !email || !subject || !message) {
      res.status(400).json({ error: 'Campos obrigatórios faltando' });
      return;
    }

    const contato = await prisma.formularioContato.create({
      data: { name, email, phone, subject, message },
    });

    // Enviar emails (não bloquear resposta se falhar)
    Promise.all([
      emailService.notifyNewContato({ name, email, phone, subject, message }),
      emailService.sendContatoConfirmation(name, email),
    ]).catch((error) => {
      console.error('Erro ao enviar emails:', error);
    });

    res.status(201).json({
      success: true,
      message: 'Mensagem enviada com sucesso!',
      id: contato.id,
    });
  } catch (error) {
    console.error('Erro ao enviar contato:', error);
    res.status(500).json({ error: 'Erro ao enviar mensagem' });
  }
};

// Diagnóstico
export const submitDiagnostico = async (req: Request, res: Response): Promise<void> => {
  try {
    const { name, email, phone, clinic, revenue, mainChallenge } = req.body;

    if (!name || !email || !phone || !clinic || !revenue) {
      res.status(400).json({ error: 'Campos obrigatórios faltando' });
      return;
    }

    const diagnostico = await prisma.formularioDiagnostico.create({
      data: { name, email, phone, clinic, revenue, mainChallenge },
    });

    // Enviar email de notificação
    emailService.notifyNewDiagnostico({ name, email, phone, clinic, revenue, mainChallenge }).catch((error) => {
      console.error('Erro ao enviar email de diagnóstico:', error);
    });

    res.status(201).json({
      success: true,
      message: 'Diagnóstico enviado com sucesso!',
      id: diagnostico.id,
    });
  } catch (error) {
    console.error('Erro ao enviar diagnóstico:', error);
    res.status(500).json({ error: 'Erro ao enviar diagnóstico' });
  }
};

// Mentoria
export const submitMentoria = async (req: Request, res: Response): Promise<void> => {
  try {
    const { name, email, phone, clinic, revenue, tier } = req.body;

    if (!name || !email || !phone || !clinic || !revenue || !tier) {
      res.status(400).json({ error: 'Campos obrigatórios faltando' });
      return;
    }

    const mentoria = await prisma.formularioMentoria.create({
      data: { name, email, phone, clinic, revenue, tier },
    });

    // Enviar email de notificação
    emailService.notifyNewMentoria({ name, email, phone, clinic, revenue, tier }).catch((error) => {
      console.error('Erro ao enviar email de mentoria:', error);
    });

    res.status(201).json({
      success: true,
      message: 'Inscrição enviada com sucesso!',
      id: mentoria.id,
    });
  } catch (error) {
    console.error('Erro ao enviar mentoria:', error);
    res.status(500).json({ error: 'Erro ao enviar inscrição' });
  }
};

// Consultoria
export const submitConsultoria = async (req: Request, res: Response): Promise<void> => {
  try {
    const { name, email, phone, clinic, revenue, mainChallenge } = req.body;

    if (!name || !email || !phone || !clinic || !revenue) {
      res.status(400).json({ error: 'Campos obrigatórios faltando' });
      return;
    }

    const consultoria = await prisma.formularioConsultoria.create({
      data: { name, email, phone, clinic, revenue, mainChallenge },
    });

    // Enviar email de notificação
    emailService.notifyNewConsultoria({ name, email, phone, clinic, revenue, mainChallenge }).catch((error) => {
      console.error('Erro ao enviar email de consultoria:', error);
    });

    res.status(201).json({
      success: true,
      message: 'Solicitação de consultoria enviada com sucesso!',
      id: consultoria.id,
    });
  } catch (error) {
    console.error('Erro ao enviar consultoria:', error);
    res.status(500).json({ error: 'Erro ao enviar solicitação de consultoria' });
  }
};

// Palestras
export const submitPalestras = async (req: Request, res: Response): Promise<void> => {
  try {
    const { name, email, phone, company, eventType, attendees, date, message } = req.body;

    if (!name || !email || !phone || !company) {
      res.status(400).json({ error: 'Campos obrigatórios faltando' });
      return;
    }

    const palestra = await prisma.formularioPalestras.create({
      data: { name, email, phone, company, eventType, attendees, date, message },
    });

    // Enviar email de notificação
    emailService.notifyNewPalestras({ name, email, phone, company, eventType, attendees, date, message }).catch((error) => {
      console.error('Erro ao enviar email de palestra:', error);
    });

    res.status(201).json({
      success: true,
      message: 'Solicitação enviada com sucesso!',
      id: palestra.id,
    });
  } catch (error) {
    console.error('Erro ao enviar solicitação de palestra:', error);
    res.status(500).json({ error: 'Erro ao enviar solicitação' });
  }
};

// Newsletter
export const submitNewsletter = async (req: Request, res: Response): Promise<void> => {
  try {
    const { email } = req.body;

    if (!email) {
      res.status(400).json({ error: 'Email é obrigatório' });
      return;
    }

    // Verificar se já existe
    const existing = await prisma.formularioNewsletter.findUnique({
      where: { email },
    });

    if (existing) {
      if (existing.active) {
        res.status(200).json({
          success: true,
          message: 'Você já está inscrito na newsletter!',
        });
        return;
      } else {
        // Reativar
        await prisma.formularioNewsletter.update({
          where: { email },
          data: { active: true },
        });
        res.status(200).json({
          success: true,
          message: 'Inscrição reativada com sucesso!',
        });
        return;
      }
    }

    await prisma.formularioNewsletter.create({
      data: { email },
    });

    // Enviar email de notificação
    emailService.notifyNewNewsletter({ email }).catch((error) => {
      console.error('Erro ao enviar email de newsletter:', error);
    });

    res.status(201).json({
      success: true,
      message: 'Inscrição realizada com sucesso!',
    });
  } catch (error) {
    console.error('Erro ao inscrever na newsletter:', error);
    res.status(500).json({ error: 'Erro ao realizar inscrição' });
  }
};

// Avaliação/Quiz
export const submitAvaliacao = async (req: Request, res: Response): Promise<void> => {
  try {
    const {
      name,
      email,
      phone,
      position,
      revenue,
      employees,
      operationTime,
      quizAnswers,
      totalScore,
      maturityLevel,
    } = req.body;

    if (
      !name ||
      !email ||
      !phone ||
      !position ||
      !revenue ||
      !employees ||
      !operationTime ||
      !quizAnswers ||
      totalScore === undefined ||
      !maturityLevel
    ) {
      res.status(400).json({ error: 'Campos obrigatórios faltando' });
      return;
    }

    const avaliacao = await prisma.formularioAvaliacao.create({
      data: {
        name,
        email,
        phone,
        position,
        revenue,
        employees,
        operationTime,
        quizAnswers,
        totalScore,
        maturityLevel,
      },
    });

    // Enviar email de notificação
    emailService.notifyNewAvaliacao({
      name,
      email,
      phone,
      position,
      revenue,
      employees,
      operationTime,
      totalScore,
      maturityLevel,
    }).catch((error) => {
      console.error('Erro ao enviar email de avaliação:', error);
    });

    res.status(201).json({
      success: true,
      message: 'Avaliação concluída com sucesso!',
      id: avaliacao.id,
      result: {
        totalScore,
        maturityLevel,
      },
    });
  } catch (error) {
    console.error('Erro ao enviar avaliação:', error);
    res.status(500).json({ error: 'Erro ao enviar avaliação' });
  }
};

// ===========================
// ENDPOINTS ADMIN (VISUALIZAÇÃO)
// ===========================

// Listar Contatos
export const adminGetContatos = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const { read } = req.query;

    const where: any = {};
    if (read !== undefined) {
      where.read = read === 'true';
    }

    const contatos = await prisma.formularioContato.findMany({
      where,
      orderBy: { createdAt: 'desc' },
    });

    res.json(contatos);
  } catch (error) {
    console.error('Erro ao buscar contatos:', error);
    res.status(500).json({ error: 'Erro ao buscar contatos' });
  }
};

// Buscar Contato por ID
export const adminGetContatoById = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const id = String(req.params.id);

    const contato = await prisma.formularioContato.findUnique({
      where: { id },
    });

    if (!contato) {
      res.status(404).json({ error: 'Contato não encontrado' });
      return;
    }

    res.json(contato);
  } catch (error) {
    console.error('Erro ao buscar contato:', error);
    res.status(500).json({ error: 'Erro ao buscar contato' });
  }
};

// Marcar como lido
export const adminMarkContatoRead = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const id = String(req.params.id);
    const { read } = req.body;

    const contato = await prisma.formularioContato.update({
      where: { id },
      data: { read: read !== undefined ? read : true },
    });

    res.json(contato);
  } catch (error) {
    console.error('Erro ao marcar contato como lido:', error);
    res.status(500).json({ error: 'Erro ao atualizar contato' });
  }
};

// Deletar Contato
export const adminDeleteContato = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const id = String(req.params.id);

    await prisma.formularioContato.delete({
      where: { id },
    });

    res.json({ message: 'Contato deletado com sucesso' });
  } catch (error) {
    console.error('Erro ao deletar contato:', error);
    res.status(500).json({ error: 'Erro ao deletar contato' });
  }
};

export const adminMarkDiagnosticoRead = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const id = String(req.params.id);
    const { read } = req.body;
    const item = await prisma.formularioDiagnostico.update({
      where: { id },
      data: { read: read !== undefined ? read : true },
    });
    res.json(item);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao atualizar diagnóstico' });
  }
};

export const adminMarkMentoriaRead = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const id = String(req.params.id);
    const { read } = req.body;
    const item = await prisma.formularioMentoria.update({
      where: { id },
      data: { read: read !== undefined ? read : true },
    });
    res.json(item);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao atualizar mentoria' });
  }
};

export const adminMarkConsultoriaRead = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const id = String(req.params.id);
    const { read } = req.body;
    const item = await prisma.formularioConsultoria.update({
      where: { id },
      data: { read: read !== undefined ? read : true },
    });
    res.json(item);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao atualizar consultoria' });
  }
};

export const adminMarkPalestraRead = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const id = String(req.params.id);
    const { read } = req.body;
    const item = await prisma.formularioPalestras.update({
      where: { id },
      data: { read: read !== undefined ? read : true },
    });
    res.json(item);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao atualizar palestra' });
  }
};

export const adminMarkNewsletterRead = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const id = String(req.params.id);
    const { active } = req.body;
    const item = await prisma.formularioNewsletter.update({
      where: { id },
      data: { active: active !== undefined ? active : true },
    });
    res.json(item);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao atualizar newsletter' });
  }
};

export const adminMarkAvaliacaoRead = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const id = String(req.params.id);
    const { read } = req.body;
    const item = await prisma.formularioAvaliacao.update({
      where: { id },
      data: { read: read !== undefined ? read : true },
    });
    res.json(item);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao atualizar avaliação' });
  }
};

// Similar para outros formulários...
export const adminGetDiagnosticos = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const { read } = req.query;
    const where: any = {};
    if (read !== undefined) where.read = read === 'true';

    const diagnosticos = await prisma.formularioDiagnostico.findMany({
      where,
      orderBy: { createdAt: 'desc' },
    });

    res.json(diagnosticos);
  } catch (error) {
    console.error('Erro ao buscar diagnósticos:', error);
    res.status(500).json({ error: 'Erro ao buscar diagnósticos' });
  }
};

export const adminGetMentorias = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const { read } = req.query;
    const where: any = {};
    if (read !== undefined) where.read = read === 'true';

    const mentorias = await prisma.formularioMentoria.findMany({
      where,
      orderBy: { createdAt: 'desc' },
    });

    res.json(mentorias);
  } catch (error) {
    console.error('Erro ao buscar mentorias:', error);
    res.status(500).json({ error: 'Erro ao buscar mentorias' });
  }
};

export const adminGetConsultorias = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const { read } = req.query;
    const where: any = {};
    if (read !== undefined) where.read = read === 'true';

    const consultorias = await prisma.formularioConsultoria.findMany({
      where,
      orderBy: { createdAt: 'desc' },
    });

    res.json(consultorias);
  } catch (error) {
    console.error('Erro ao buscar consultorias:', error);
    res.status(500).json({ error: 'Erro ao buscar consultorias' });
  }
};

export const adminGetPalestras = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const { read } = req.query;
    const where: any = {};
    if (read !== undefined) where.read = read === 'true';

    const palestras = await prisma.formularioPalestras.findMany({
      where,
      orderBy: { createdAt: 'desc' },
    });

    res.json(palestras);
  } catch (error) {
    console.error('Erro ao buscar solicitações de palestras:', error);
    res.status(500).json({ error: 'Erro ao buscar solicitações' });
  }
};

export const adminGetNewsletters = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const { active } = req.query;
    const where: any = {};
    if (active !== undefined) where.active = active === 'true';

    const newsletters = await prisma.formularioNewsletter.findMany({
      where,
      orderBy: { createdAt: 'desc' },
    });

    res.json(newsletters);
  } catch (error) {
    console.error('Erro ao buscar inscritos na newsletter:', error);
    res.status(500).json({ error: 'Erro ao buscar inscritos' });
  }
};

export const adminGetAvaliacoes = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const { read } = req.query;
    const where: any = {};
    if (read !== undefined) where.read = read === 'true';

    const avaliacoes = await prisma.formularioAvaliacao.findMany({
      where,
      orderBy: { createdAt: 'desc' },
    });

    res.json(avaliacoes);
  } catch (error) {
    console.error('Erro ao buscar avaliações:', error);
    res.status(500).json({ error: 'Erro ao buscar avaliações' });
  }
};

export default {
  submitContato,
  submitDiagnostico,
  submitMentoria,
  submitConsultoria,
  submitPalestras,
  submitNewsletter,
  submitAvaliacao,
  adminGetContatos,
  adminGetContatoById,
  adminMarkContatoRead,
  adminDeleteContato,
  adminGetDiagnosticos,
  adminMarkDiagnosticoRead,
  adminGetMentorias,
  adminMarkMentoriaRead,
  adminGetConsultorias,
  adminMarkConsultoriaRead,
  adminGetPalestras,
  adminMarkPalestraRead,
  adminGetNewsletters,
  adminMarkNewsletterRead,
  adminGetAvaliacoes,
  adminMarkAvaliacaoRead,
};
