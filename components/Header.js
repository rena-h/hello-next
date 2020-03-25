import Link from "next/link";

const linkStyle = {
  marginRight: 15
};

const Header = () => (
  <div>
    <Link href="/">
      <a style={linkStyle} title="Home">
        Home
      </a>
    </Link>
    <Link href="/about" as="/about">
      <a style={linkStyle} title="About Page">
        About
      </a>
    </Link>
  </div>
);

export default Header;
