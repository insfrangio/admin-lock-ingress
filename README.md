[Next.js](https://nextjs.org/) [http://localhost:3000](http://localhost:3000) `pages/index.tsx` [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

# Passos para adicionar a lib de freeBets em algum projeto.

## 1. Configuração inicial para ter o provider da lib

Envolver o header da página com o provider, para que o contexto não afete toda a renderização dos componentes.

Os seguintes valores são passados ​​como parâmetros:

- getRewardsMethod= função que realiza o post para a `API`.
- delayRequest= tempo a ser executado o intervalo da requisição.
- currency= tipo de moeda.
- t= função para tradução.
- uniqueKey= chave exclusiva para armazenar no `localStorage`.
- Trans= componente de tradução.

```javascript
import { FreeBetsProvider } from '@sysgaming-lab/react-free-bets';

<FreeBetsProvider
  getRewardsMethod={getRewards}
  delayRequest={30000}
  currency={currency}
  t={t}
  uniqueKey={`mines_${sessionStorage.getItem('USERNAME')}`}
  Trans={Trans}
>
  <Header>...conteúdo do cabeçalho</Header>
</FreeBetsProvider>;
```

## 2.Implementação do botao de sair (implementado no mines)

- Fluxo de betar no modo freeBets.

Temos a função de betar, na qual foram passados ​​mais dois parâmetros que o back precisa receber no momento da aposta ser Free.

Onde se a promessa for exitosa a função `updatedBetUsed()` é executada que dispara um evento na lib que atualiza o betCountUsed no front, e caso ocorra um erro um evento é acionado passando os dados do error como detail para que a lib possa ouvir e disparar um modal.

```javascript
import { useFreebets } from '@sysgaming-lab/react-free-bets';

const { exitFreeBetMode, reward, updateBetUsed } = useFreebets();

// Função que envia a aposta para a API
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

- Colocando o botão e a ação para sair do modo freeBets

Como podemos ver o botão está dentro do projeto e estilizado nele.

Está sendo válidado para mostrar no caso de haver uma reward ativa.

No momento de dar click uma função ê executada que dispara um evento dentro da lib que define o estado de reward ativa como `undefined`.

```javascript
{
  reward?._id && (
    <S.ButtonExit
      onClick={() => {
        setHasValue(false);
        setUserForm({
          bet: '0'
        });
        exitFreeBetMode({});
      }}
      variant='danger'
    >
      <S.TextExit>{t('general.exitModeFree')}</S.TextExit>
      <S.CloseIcon />
    </S.ButtonExit>
  );
}
```

```bash
npm run dev
# or
yarn dev
```
