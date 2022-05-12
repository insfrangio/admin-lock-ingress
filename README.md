[Next.js](https://nextjs.org/) [http://localhost:3000](http://localhost:3000) `pages/index.tsx` [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Passos para adicionar a lib de freeBets em algum projeto.

# Implementação do botao de bet projeto de mines

Temos a função de betar, na qual foram passados ​​mais dois parâmetros que o back precisa receber no momento da aposta ser Free.

Onde se a promessa for exitosa a função updatedBetUsed() é executada, e caso ocorra um erro um evento é acionado passando os dados do error como detail para que a lib possa ouvir e disparar um modal.

```javascript
import { useFreebets } from '@sysgaming-lab/react-free-bets';

const { exitFreeBetMode, reward, updateBetUsed } = useFreebets();

// Função que envia a aposta para a api
const onStartRound = (
  minesAmounth,
  betValue,
  isFree,
  rewardId,
  updateBetUsed
) => {
  api
    .post(`${backHostname}/game/start-round`, {
      minesAmounth: minesAmounth,
      betValue: betValue,
      isFree,
      rewardId
    })
    .then((resp) => {
      updateBetUsed();
    })
    .catch((error) => {
      document.dispatchEvent(
        new CustomEvent(`@free-bets-error`, {
          detail: {
            error: error?.response?.data
          }
        })
      );
    });
};

// JSX do componente que chama a função bet
<ButtonBet
  onClick={() => {
    onStartRound(
      parseFloat(radioValue),
      parseFloat(userForm.bet),
      !!reward,
      reward?._id,
      updateBetUsed
    );
  }}
/>;
```

```bash
npm run dev
# or
yarn dev
```
