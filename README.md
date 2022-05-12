# 🔥 Passos para adicionar a lib de freeBets em algum projeto. 🔥

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
  <Header>...conteúdo do header</Header>
</FreeBetsProvider>;
```

## 2. Adicionar imagens ao projeto

Es necessário implementar as imagens usadas dentro da lib, na pasta que fica dentro do projeto:

`public/img`

Caso não tenhamos uma pasta img em public, devemos criar.

Nome dos arquivos:

- coin.png
- error.png
- people.png

## 3. Importar o Banner de FreeBets abaixo do header

Levar em consideração o posicionamento do header na página para evitar erros no estilo.

```javascript
import { FreeBetsBanner } from '@sysgaming-lab/react-free-bets';

<Fragment>
  <Header>...conteúdo do header</Header>
  <FreeBetsBanner />
</Fragment>;
```

## 4. Implementação do botao de sair (implementado no mines)

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

Para este projeto específico o botão da lib react-boostrap é usado e estilizado com styled-components.

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

// Estilos do botão
export const ButtonExit = styled(ButtonBootstrap)`
  border: none;
  display: flex;
  align-items: center;

  height: 50px;
  margin-left: -10px;
  min-width: 110px;

  background: rgb(46, 53, 72);
  background: linear-gradient(
    270deg,
    rgba(46, 53, 72, 1) 10%,
    rgba(92, 44, 59, 1) 50%
  );
`;

export const TextExit = styled.span`
  text-align: center;

  font-size: 12px;
  margin-left: 10px;

  width: 100%;

  flex: 1;
  line-height: 1.5;
  font-weight: 400;

  color: #fafafa;
`;
```

## 5. Adicionar arquivos de tradução.

É necessário adicionar os arquivos de tradução já que a função para traduzir está sendo passada para a lib.

```json

  // PT_BR

  "general.freeBet": "Jogando Grátis",
  "general.remainingFreeBets": "Jogadas grátis restantes: {{remaining}}",
  "freebets.gotReward": "Você ganhou uma recompensa",
  "freebets.info": "<p>Você recebeu <span class=\"strong\">{{betCount}} apostas</span> grátis, cada uma no valor de <span class=\"strong\">{{betAmount}}</span></p><p>As apostas vencem em <span class=\"strong\">{{date}} às {{time}}</span></p>",
  "freebets.notSeeAnymore": "Não ver mais essa mensagem",
  "freebets.playLater": "Jogar mais tarde",
  "freebets.playNow": "Jogar agora",
  "general.IdontWant": "Não Quero",
  "general.betNow": "Jogar agora",
  "general.comeBackRewards": "Voltar para as minhas recompensas",
  "general.congratulations": "PARABÉNS!",
  "general.readRegulation": "Consulte o regulamento",
  "general.regulation": "1. Solo se puede aceptar una oferta de Apuetas Grátis a la vez. <br/><br/>2. Tras aceptar la oferta de apuestas Grátis deberás completar todas las apuestas antes de volver al juego estándar. <br/><br/>3. Al finalizar la útima apuesta, todas las ganancias se añadirán a tu saldo real. <br/><br/>4. Solo se añadirán a tu saldo real las ganancias obtenidas en apuestas gratis. <br/><br/>5. Las apuestas gratis se pierden en cualuquier caso de empate. <br/><br/>6. Todas las apuestas están valoradas en la misma cantidad especificada en la oferta. <br/><br/>7. El número de apuestas otorgadas también aparece en la oferta. <br/><br/>8. La cantidad de apuestas por ronda está limitada y se especicfica en la oferta. <br/><br/>9. Para ver el valor y cantidad de apuestas por ronda pulsa en el icono de la flecha hacia abajo de la esquina superior izquierda. <br/><br/>10. !Recuerda! La apuesta con seguro no está permitida durante la ronda de Apuestas Gratis.",
  "general.useFreeBet": "Usar {{remaining}}/{{betCount}} aposta grátis",
  "general.validUntilThisDate": "Valido até {{startDate}} as {{startTime}}hs",
  "general.youHaveBets": "Voce tem {{betCountUsed}} apostas de {{betCount}}",
  "rules.straightExit": "<h6 class=\"mt-2\">SAÍDA FORÇADA</h6><p>Sempre que o prêmio do jogador no round puder alcançar um valor superior ao lucro máximo, o prêmio é retirado automaticamente.</p>"

```
