# CoreERP Purchasing

Módulo de domínio para fornecedores e pedidos de compra, independente de um setor específico.

## O que faz

- Calcula totais de pedidos usando centavos inteiros e quantidades em milésimos.
- Valida transições de status do pedido.
- Permite fluxo de rascunho, envio, recebimento parcial, recebimento completo ou cancelamento.
- Impede transições após estado terminal.

## Executar

Requer Node.js 20 ou superior.

```bash
npm test
```

## Funções principais

- `calculatePurchaseTotal(items)`: retorna linhas e total em centavos.
- `canTransitionPurchaseStatus(from, to)`: verifica o fluxo permitido.

O módulo é uma biblioteca de domínio demonstrativa. O armazenamento e os relacionamentos com fornecedores/produtos serão persistidos nas tabelas `suppliers`, `purchase_orders` e `purchase_order_items` do repositório `coreerp-database`; essa integração ainda não foi feita.
