import packageInfo from '../../../../package.json';
import * as S from './style';

const PackageVersion = () => {
  return (
    <S.Wrapper>
      <S.Version>{packageInfo.version}</S.Version>
    </S.Wrapper>
  );
};

export default PackageVersion;
