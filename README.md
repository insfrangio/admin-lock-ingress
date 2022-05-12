[Next.js](https://nextjs.org/) [http://localhost:3000](http://localhost:3000) `pages/index.tsx` [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Passos para adicionar a lib de freeBets em algum projeto.

# Implementação do botao de bet projeto de mines

Temos a função de betar, na qual foram passados ​​mais dois parâmetros que o back precisa receber no momento da aposta ser Free.

```react
  const onStartRound = (minesAmounth, betValue, isFree, rewardId, updateBetUsed) => {
    if (!betValue || betValue <= 0 || user.balance <= 0 || betValue > user.balance) {
      return;
    }
    api
      .post(`${backHostname}/game/start-round`, {
        ...sessionParams(),
        minesAmounth: minesAmounth,
        betValue: betValue,
        isFree,
        rewardId,
      })
      .then(resp => {
        updateBetUsed();
      })
      .catch(error => {
        document.dispatchEvent(
          new CustomEvent(`@free-bets-error`, {
            detail: {
              error: error?.response?.data,
            },
          }),
        );
      });
  };
```

```bash
npm run dev
# or
yarn dev
```
