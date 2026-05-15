const express = require('express');
const path = require('path');
const app = express();
const port = process.env.PORT || 3000;

// Bancos de dados em memória (Arrays)
// No Vercel Serverless, esses dados serão resetados se a função hibernar.
const leads = [];
const customers = [];
const products = [
    { id: 1, name: 'Vibe Pura', category: 'Signature', price: 24.90, description: 'Sabor da Festa + Redução de Danos. A fórmula original que definiu o padrão da mansão.', image_url: 'https://lh3.googleusercontent.com/aida-public/AB6AXuC2eqL49IIzhGuJEgIHVqGbz8I8tslk4h9ai-BWsqc_dofC0cJUiuF7QFtpHCnim-yYj5h3VONJIl4OGLdD0QpGLqgrtv4EAycrPyXryscroNUHRPqK6vy8al7z3y2rkh4WK-MxQPdlN2-lsICdzPgbwYCiazbrujQvqbL8TmvWvd-4V2TapWAxoCQe2bjO2qfllNm5dNfO6vhIUjtSqptrGiLd2ZiFyfZb5VdANcLO5kdtYGO6UoFH0f9T476Jf01qfTNnhApH3nPR' },
    { id: 2, name: 'Energia Tropical', category: 'Summer', price: 26.90, description: 'Melancia glacial com toque de eletrólitos. O refresh necessário para o after infinito.', image_url: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDFrkaYtU0dDXcnL6lviUs0Y8rMmnsKz8yS5pdoVzzcn9RUUYTp557HtrlkFKhJD1k4Nzb6uq4LUAZKotLevLeAzyCmtZEosiVNcn1sLZ1xkXyGd48vf6Fv7t3tWq6rAUAHFcxNiQND0Sv-aJkOGlt7R--IjZpWnSCFoxKXCSDcB-kc8ylfp9aWgMmif66FXdc_UY71SnVdez1jFQeMFup_sVM6utXAiYFury7GaiBBSfspjm7cW8JuHIHe0YvZ4jcQ0YP_M9IwgfFL' },
    { id: 3, name: 'Shock Cítrico', category: 'High Voltage', price: 24.90, description: 'Explosão de limão tahiti e yuzu. Redução de danos com foco total na pista.', image_url: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCi1tBQDA7EGLiclXw5bjc-wkVJJZdwGkeMlAVmejK-mzwQvTn7Xho_fz3-PeoflUOmnrrvAUw5GelcvTHv3axSj-osh3eT0JcqN5TrYWxEIKYIqXMj5wSTGVH0g0fFsjMDU6ABS7bYrGsjYa-wA-kWljWcQfpAtoB2qtbfX-mOxCO2CBr-bPXYyjtDcRXmqEsz9ck-JkakGW-6QqsfJNRB8LMlRQcNEDH8wLabJO0oOCzjqSScSqa2UESza1fOKkT61_SSB3zeFaPs' },
    { id: 4, name: 'Monster Grape', category: 'Signature', price: 25.90, description: 'Uva intensa com carga extra de taurina. O combustível pesado para quem não para.', image_url: 'https://lh3.googleusercontent.com/aida-public/AB6AXuC2eqL49IIzhGuJEgIHVqGbz8I8tslk4h9ai-BWsqc_dofC0cJUiuF7QFtpHCnim-yYj5h3VONJIl4OGLdD0QpGLqgrtv4EAycrPyXryscroNUHRPqK6vy8al7z3y2rkh4WK-MxQPdlN2-lsICdzPgbwYCiazbrujQvqbL8TmvWvd-4V2TapWAxoCQe2bjO2qfllNm5dNfO6vhIUjtSqptrGiLd2ZiFyfZb5VdANcLO5kdtYGO6UoFH0f9T476Jf01qfTNnhApH3nPR' },
    { id: 5, name: 'Ice Mint Blast', category: 'Summer', price: 27.90, description: 'Menta polar ultra-refrescante. Congela a sede e renova as energias na hora.', image_url: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDFrkaYtU0dDXcnL6lviUs0Y8rMmnsKz8yS5pdoVzzcn9RUUYTp557HtrlkFKhJD1k4Nzb6uq4LUAZKotLevLeAzyCmtZEosiVNcn1sLZ1xkXyGd48vf6Fv7t3tWq6rAUAHFcxNiQND0Sv-aJkOGlt7R--IjZpWnSCFoxKXCSDcB-kc8ylfp9aWgMmif66FXdc_UY71SnVdez1jFQeMFup_sVM6utXAiYFury7GaiBBSfspjm7cW8JuHIHe0YvZ4jcQ0YP_M9IwgfFL' },
    { id: 6, name: 'Night Crawler', category: 'Limited', price: 29.90, description: 'Blend noturno com foco em relaxamento pós-treino e recuperação rápida.', image_url: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCi1tBQDA7EGLiclXw5bjc-wkVJJZdwGkeMlAVmejK-mzwQvTn7Xho_fz3-PeoflUOmnrrvAUw5GelcvTHv3axSj-osh3eT0JcqN5TrYWxEIKYIqXMj5wSTGVH0g0fFsjMDU6ABS7bYrGsjYa-wA-kWljWcQfpAtoB2qtbfX-mOxCO2CBr-bPXYyjtDcRXmqEsz9ck-JkakGW-6QqsfJNRB8LMlRQcNEDH8wLabJO0oOCzjqSScSqa2UESza1fOKkT61_SSB3zeFaPs' },
    { id: 7, name: 'Nitro Punch', category: 'High Voltage', price: 28.90, description: 'Carga máxima de beta-alanina e cafeína. O soco de energia que a sua rotina precisa.', image_url: 'https://lh3.googleusercontent.com/aida-public/AB6AXuC2eqL49IIzhGuJEgIHVqGbz8I8tslk4h9ai-BWsqc_dofC0cJUiuF7QFtpHCnim-yYj5h3VONJIl4OGLdD0QpGLqgrtv4EAycrPyXryscroNUHRPqK6vy8al7z3y2rkh4WK-MxQPdlN2-lsICdzPgbwYCiazbrujQvqbL8TmvWvd-4V2TapWAxoCQe2bjO2qfllNm5dNfO6vhIUjtSqptrGiLd2ZiFyfZb5VdANcLO5kdtYGO6UoFH0f9T476Jf01qfTNnhApH3nPR' },
    { id: 8, name: 'Coco Loco', category: 'Summer', price: 25.90, description: 'Água de coco premium com minerais marinhos. Hidratação nível Mansão.', image_url: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDFrkaYtU0dDXcnL6lviUs0Y8rMmnsKz8yS5pdoVzzcn9RUUYTp557HtrlkFKhJD1k4Nzb6uq4LUAZKotLevLeAzyCmtZEosiVNcn1sLZ1xkXyGd48vf6Fv7t3tWq6rAUAHFcxNiQND0Sv-aJkOGlt7R--IjZpWnSCFoxKXCSDcB-kc8ylfp9aWgMmif66FXdc_UY71SnVdez1jFQeMFup_sVM6utXAiYFury7GaiBBSfspjm7cW8JuHIHe0YvZ4jcQ0YP_M9IwgfFL' }
];

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, '.')));

// Rota para servir o frontend
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

// Endpoints da API
app.post('/api/subscribe', (req, res) => {
    const { email, city, type } = req.body;
    
    if (!email) {
        return res.status(400).json({ error: 'Email é obrigatório' });
    }

    try {
        leads.push({
            id: leads.length + 1,
            email,
            city: city || null,
            type: type || 'newsletter',
            created_at: new Date().toISOString()
        });
        res.status(200).json({ message: 'Inscrição realizada com sucesso!' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Erro ao salvar os dados' });
    }
});

app.post('/api/register', (req, res) => {
    const { name, email, password, phone } = req.body;
    
    if (!name || !email || !password) {
        return res.status(400).json({ error: 'Nome, email e senha são obrigatórios' });
    }

    try {
        const userExists = customers.find(c => c.email === email);
        if (userExists) {
            return res.status(400).json({ error: 'Email já cadastrado' });
        }

        customers.push({
            id: customers.length + 1,
            name,
            email,
            password,
            phone: phone || null,
            created_at: new Date().toISOString()
        });
        res.status(201).json({ message: 'Cliente cadastrado com sucesso!' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Erro ao cadastrar cliente' });
    }
});

app.get('/api/products', (req, res) => {
    res.json(products);
});

// Rota para ver os leads (apenas para teste)
app.get('/api/leads', (req, res) => {
    res.json(leads);
});

// Exportar para o Vercel Serverless Functions ou iniciar o servidor localmente
if (process.env.VERCEL) {
    module.exports = app;
} else {
    app.listen(port, () => {
        console.log(`Servidor rodando em http://localhost:${port}`);
    });
}
