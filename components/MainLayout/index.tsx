import styled from "styled-components";
import Head from "next/head";
import Link from "next/link";

const Wrapper = styled.div`
  width: 80%;
  margin: 0 auto;
`;

const Main = styled.main`
  min-height: 85vh;
`;
const Headind = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px;
  background-color: #333333;
  border-bottom: 6px solid #bb3737;
`;

const Button = styled.a`
  width: 80px;
  height: 40px;
  text-align: center;
  padding-top: 12px;
  border: 2px solid white;
  color: white;
  font-size: 10px;
  font-family: Helvetica Neue;
  background-color: transparent;
  cursor: pointer;

  @media(min-width: 440px) {
    font-size: 16px;
    width: 140px;
  }
`;

const Logo = styled.p`
  color: white;
  font-size: 20px;
  font-family: Helvetica Neue;
  cursor: pointer;
  @media(min-width: 440px) {
    font-size: 26px;
  }
`;

const FooterText = styled.p`
  color: white;
  font-size: 18px;
  font-family: Helvetica Neue;
`;

const Footer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #333333;
  border-top: 6px solid #bb3737;
  height: 40px;
`;

const Header: React.FC = ({ children }) => {
  return (
    <Wrapper>
      <Head>
         <title>Blogberg</title>
         <meta name="keywords" content="blog, news, posts"/>
         <meta name="description" content="news blog"/>
         <link rel="icon" href="/favicon.ico" />
     </Head>
      <Headind>
        <Link href="/">
          <Logo>BLOGBERG</Logo>
        </Link>
        <Link href="/posts/new">
          <Button>ADD A POST</Button>
        </Link>
      </Headind>
      <Main>{children}</Main>
      <Footer>
        <FooterText>(c) Test blog</FooterText>
      </Footer>
    </Wrapper>
  );
}

export default Header;
