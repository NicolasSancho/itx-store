import { Breadcrumbs, Button, CartIcon, Header as CustomHeader, Image } from '@NicolasSancho/storybook-core';
import zaraLogo from '../assets/logo.png';

function Header() {
  return (
    <div className="app-header">
    <CustomHeader>
        <CustomHeader.Left>
            <Image src={zaraLogo} className="logo" alt="Zara logo" />
        </CustomHeader.Left>
        <CustomHeader.Right>
          <CartIcon size="large" count={2} />
        </CustomHeader.Right>
    </CustomHeader>
    </div>
  );
}

export default Header;
