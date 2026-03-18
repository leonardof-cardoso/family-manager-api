const express = require('express')
const { PrismaClient } = require('@prisma/client')

const prisma = new PrismaClient()

const app = express()
app.use(express.json())

app.post('/usuarios', async (req, res) => {
    try {
        const user = await prisma.user.create({
            data: {
                id: req.body.id,
                name: req.body.name,
                email: req.body.email,
                age: req.body.age
            }
        })

        res.status(201).json({
            success: true,
            message: 'Usuário criado com sucesso',
            data: user
        })
    } catch (error) {
        res.status(400).json({
            success: false,
            message: 'Erro ao criar usuário',
            error: error.message
        })
    }
})

app.get('/usuarios', async (req, res) => {
    try {
        const users = await prisma.user.findMany()
        
        res.status(200).json({
            success: true,
            message: `${users.length} usuário(s) encontrado(s)`,
            data: users
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Erro ao buscar usuários',
            error: error.message
        })
    }
})

app.get('/usuarios/:id', async (req, res) => {
    try {
        const user = await prisma.user.findUnique({
            where: { id: req.params.id }
        })

        if (!user) {
            return res.status(404).json({
                success: false,
                message: 'Usuário não encontrado',
                data: null
            })
        }

        res.status(200).json({
            success: true,
            message: 'Usuário encontrado com sucesso',
            data: user
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Erro ao buscar usuário',
            error: error.message
        })
    }
})

app.put('/usuarios/:id', async (req, res) => {
    try {
        const user = await prisma.user.update({
            where: { id: req.params.id },
            data: {
                name: req.body.name,
                email: req.body.email,
                age: req.body.age
            }
        })

        res.status(200).json({
            success: true,
            message: 'Usuário atualizado com sucesso',
            data: user
        })
    } catch (error) {
        if (error.code === 'P2025') {
            return res.status(404).json({
                success: false,
                message: 'Usuário não encontrado',
                data: null
            })
        }
        
        res.status(400).json({
            success: false,
            message: 'Erro ao atualizar usuário',
            error: error.message
        })
    }
})

app.delete('/usuarios/:id', async (req, res) => {
    try {
        const user = await prisma.user.delete({
            where: { id: req.params.id }
        })

        res.status(200).json({
            success: true,
            message: 'Usuário deletado com sucesso',
            data: user
        })
    } catch (error) {
        if (error.code === 'P2025') {
            return res.status(404).json({
                success: false,
                message: 'Usuário não encontrado',
                data: null
            })
        }

        res.status(400).json({
            success: false,
            message: 'Erro ao deletar usuário',
            error: error.message
        })
    }
})

// ===== ROTAS DE PARENTS =====

app.post('/parents', async (req, res) => {
    try {
        const parent = await prisma.parent.create({
            data: {
                name: req.body.name,
                email: req.body.email,
                phone: req.body.phone
            }
        })

        res.status(201).json({
            success: true,
            message: 'Parent criado com sucesso',
            data: parent
        })
    } catch (error) {
        res.status(400).json({
            success: false,
            message: 'Erro ao criar parent',
            error: error.message
        })
    }
})

app.get('/parents', async (req, res) => {
    try {
        const parents = await prisma.parent.findMany({
            include: {
                users: true
            }
        })

        res.status(200).json({
            success: true,
            message: `${parents.length} parent(s) encontrado(s)`,
            data: parents
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Erro ao buscar parents',
            error: error.message
        })
    }
})

app.get('/parents/:id', async (req, res) => {
    try {
        const parent = await prisma.parent.findUnique({
            where: { id: req.params.id },
            include: {
                users: true
            }
        })

        if (!parent) {
            return res.status(404).json({
                success: false,
                message: 'Parent não encontrado',
                data: null
            })
        }

        res.status(200).json({
            success: true,
            message: 'Parent encontrado com sucesso',
            data: parent
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Erro ao buscar parent',
            error: error.message
        })
    }
})

app.put('/parents/:id', async (req, res) => {
    try {
        const parent = await prisma.parent.update({
            where: { id: req.params.id },
            data: {
                name: req.body.name,
                email: req.body.email,
                phone: req.body.phone
            },
            include: {
                users: true
            }
        })

        res.status(200).json({
            success: true,
            message: 'Parent atualizado com sucesso',
            data: parent
        })
    } catch (error) {
        if (error.code === 'P2025') {
            return res.status(404).json({
                success: false,
                message: 'Parent não encontrado',
                data: null
            })
        }

        res.status(400).json({
            success: false,
            message: 'Erro ao atualizar parent',
            error: error.message
        })
    }
})

app.delete('/parents/:id', async (req, res) => {
    try {
        const parent = await prisma.parent.delete({
            where: { id: req.params.id }
        })

        res.status(200).json({
            success: true,
            message: 'Parent deletado com sucesso',
            data: parent
        })
    } catch (error) {
        if (error.code === 'P2025') {
            return res.status(404).json({
                success: false,
                message: 'Parent não encontrado',
                data: null
            })
        }

        res.status(400).json({
            success: false,
            message: 'Erro ao deletar parent',
            error: error.message
        })
    }
})

app.listen(3000)
