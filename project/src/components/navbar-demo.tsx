import {
  Navbar,
  NavBody,
  NavItems,
  MobileNav,
  NavbarLogo,
  NavbarButton,
  MobileNavHeader,
  MobileNavToggle,
  MobileNavMenu,
} from "@/components/ui/resizable-navbar";
import { useState, useTransition } from "react";
import { useNavigate, useLocation } from "react-router-dom";

interface NavbarDemoProps {
  showAuthButtons?: boolean;
}

export default function NavbarDemo({ showAuthButtons = false }: NavbarDemoProps) {
  const navigate = useNavigate();
  const location = useLocation();
  const [, startTransition] = useTransition();

  const smoothNavigate = (path: string) => {
    startTransition(() => {
      navigate(path);
    });
  };

  const navItems = [
    {
      name: "Dashboard",
      link: "/dashboard",
      path: "/dashboard",
      onClick: () => smoothNavigate('/dashboard'),
    },
    {
      name: "Champions",
      link: "/",
      path: "/",
      onClick: () => smoothNavigate('/'),
    },
    {
      name: "Resources",
      link: "/resources",
      path: "/resources",
      onClick: () => smoothNavigate('/resources'),
    },
  ].map((item) => ({
    ...item,
    isActive: location.pathname === item.path,
  }));

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <div className="relative w-full">
      <Navbar>
        {/* Desktop Navigation */}
        <NavBody>
          <NavbarLogo onClick={() => smoothNavigate('/')} />
          <NavItems items={navItems} />
          {showAuthButtons && (
            <div className="flex items-center gap-4">
              <NavbarButton variant="secondary" style={{ color: '#2056AE' }}>Login</NavbarButton>
              <NavbarButton variant="primary" onClick={() => smoothNavigate('/get-started')}>Get Started</NavbarButton>
            </div>
          )}
        </NavBody>

        {/* Mobile Navigation */}
        <MobileNav>
          <MobileNavHeader>
            <NavbarLogo onClick={() => smoothNavigate('/')} />
            <MobileNavToggle
              isOpen={isMobileMenuOpen}
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            />
          </MobileNavHeader>
          <MobileNavMenu
            isOpen={isMobileMenuOpen}
            onClose={() => setIsMobileMenuOpen(false)}
          >
            {navItems.map((item, idx) => (
              <a
                key={`mobile-link-${idx}`}
                href={item.link}
                onClick={(e) => {
                  e.preventDefault();
                  setIsMobileMenuOpen(false);
                  if (item.onClick) {
                    item.onClick();
                  }
                }}
                className="relative text-neutral-600 dark:text-neutral-300 text-base md:text-lg"
                style={{ color: item.isActive ? '#2056AE' : '#2056AE', fontWeight: item.isActive ? 700 : 500 }}
                aria-current={item.isActive ? "page" : undefined}
              >
                <span className="block">{item.name}</span>
                {item.isActive && (
                  <span
                    className="absolute left-0 -bottom-1 h-0.5 w-10 rounded-full"
                    style={{ backgroundColor: '#2056AE' }}
                  />
                )}
              </a>
            ))}
            {showAuthButtons && (
              <div className="flex w-full flex-col gap-4">
                <NavbarButton
                  onClick={() => setIsMobileMenuOpen(false)}
                  variant="secondary"
                  className="w-full"
                  style={{ color: '#2056AE' }}
                >
                  Login
                </NavbarButton>
                <NavbarButton
                  onClick={() => {
                    setIsMobileMenuOpen(false);
                    navigate('/get-started');
                  }}
                  variant="primary"
                  className="w-full"
                >
                  Get Started
                </NavbarButton>
              </div>
            )}
          </MobileNavMenu>
        </MobileNav>
      </Navbar>
    </div>
  );
}



