CREATE TABLE IF NOT EXISTS categories (
    id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
    name TEXT NOT NULL,
    type INTEGER NOT NULL,
    is_default BOOLEAN DEFAULT FALSE
);

INSERT INTO categories (name, type, is_default)
VALUES
  -- Receitas (type = 1)
  ('Salário', 1, TRUE),
  ('Bônus', 1, TRUE),
  ('Rendimentos', 1, TRUE),
  ('Venda', 1, TRUE),
  ('Freelance', 1, TRUE),
  ('Vale Alimentação', 1, TRUE),

  -- Despesas (type = 2)
  ('Aluguel', 2, TRUE),
  ('Supermercado', 2, TRUE),
  ('Transporte', 2, TRUE),
  ('Saúde', 2, TRUE),
  ('Educação', 2, TRUE),
  ('Lazer', 2, TRUE),
  ('Cartão de crédito', 2, TRUE),
  ('Impostos', 2, TRUE),
  ('Outros', 2, TRUE),
  ('Luz', 2, TRUE),
  ('Água', 2, TRUE),
  ('Internet', 2, TRUE),
  ('Academia', 2, TRUE);
