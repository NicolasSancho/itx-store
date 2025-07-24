import { CartIcon, Header as CustomHeader, Image } from '@NicolasSancho/storybook-core';
import { Breadcrumbs } from './Breadcrumbs';
import zaraLogo from '../assets/logo.png';
import { useUIContext } from '../context/UiContext';
import { Link } from 'react-router-dom';

function Header() {
  const { cartCount } = useUIContext();
  const { currentProduct } = useUIContext();

  const items = [{ label: 'Home', href: '/' }];

  if (currentProduct) {
  items.push({
    label: currentProduct.model,
    href: `/product/${currentProduct.id}`,
  });
}

  return (
    <div className="app-header">
      <CustomHeader>
        <CustomHeader.Left>
          <Link to="/" className="logo-link h-full">
            <Image src={zaraLogo} className="logo" alt="Zara logo" />
          </Link>
        </CustomHeader.Left>
        <CustomHeader.Center>
          <Breadcrumbs items={items} />
        </CustomHeader.Center>
        <CustomHeader.Right>
          <CartIcon size="large" count={cartCount} />
        </CustomHeader.Right>
      </CustomHeader>
    </div>
  );
}

export default Header;
