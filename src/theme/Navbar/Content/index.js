import React from 'react';
import Link from "@docusaurus/Link";
import {useThemeConfig, ErrorCauseBoundary} from '@docusaurus/theme-common';
import {
  splitNavbarItems,
  useNavbarMobileSidebar,
} from '@docusaurus/theme-common/internal';
import NavbarItem from '@theme/NavbarItem';
import NavbarColorModeToggle from '@theme/Navbar/ColorModeToggle';
import SearchBar from '@theme/SearchBar';
import NavbarMobileSidebarToggle from '@theme/Navbar/MobileSidebar/Toggle';
import NavbarLogo from '@theme/Navbar/Logo';
import NavbarSearch from '@theme/Navbar/Search';
import styles from './styles.module.css';
import clsx from 'clsx';
import WalletWrap from "@site/src/components/Wallet/WalletWrap";
import Connect from "@site/src/components/Wallet/Connect";

function useNavbarItems() {
  // TODO temporary casting until ThemeConfig type is improved
  return useThemeConfig().navbar.items;
}
function NavbarItems({items}) {
  return (
    <>
      {items.map((item, i) => (
        <ErrorCauseBoundary
          key={i}
          onError={(error) =>
            new Error(
              `A theme navbar item failed to render.
Please double-check the following navbar item (themeConfig.navbar.items) of your Docusaurus config:
${JSON.stringify(item, null, 2)}`,
              {cause: error},
            )
          }>
          <NavbarItem {...item} />
        </ErrorCauseBoundary>
      ))}
    </>
  );
}
function NavbarContentLayout({left, right}) {
  return (
    <div className="navbar__inner max-w-[1180px]">
      <div className="navbar__items">{left}</div>
      <WalletWrap>
        <Connect />
      </WalletWrap>
    </div>
  );
}
export default function NavbarContent() {
  const mobileSidebar = useNavbarMobileSidebar();
  const items = useNavbarItems();
  const [leftItems, rightItems] = splitNavbarItems(items);
  
  return (
    <NavbarContentLayout
      left={
        // TODO stop hardcoding items?
        <>
          {!mobileSidebar.disabled && <NavbarMobileSidebarToggle />}
          <Link to="/" style={{textDecoration : 'none', color : 'white'}}>
          <div>
            World Dot
          </div>
          </Link>
          {
            leftItems.map((leftItem) => {
              return <NavbarItem {...leftItem} className="text-white ml-[78px]" />
            })
          }
          <div className={clsx("font-semibold ml-10", styles.tool)} />
        </>
      }
      right={
        // TODO stop hardcoding items?
        // Ask the user to add the respective navbar items => more flexible
        <>
          <NavbarItems items={rightItems} />
          {/* <NavbarColorModeToggle className={styles.colorModeToggle} /> */}

        </>
      }
    />
  );
}
