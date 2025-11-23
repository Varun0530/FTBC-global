import { cn } from "@/lib/utils";
import { IconMenu2, IconX } from "@tabler/icons-react";
import {
  motion,
  AnimatePresence,
  useScroll,
  useMotionValueEvent,
} from "motion/react";
import React, { useRef, useState } from "react";
import tetrapakLogo from "../../assets/tetrapak-logo.svg";

interface NavbarProps {
  children: React.ReactNode;
  className?: string;
}

interface NavBodyProps {
  children: React.ReactNode;
  className?: string;
  visible?: boolean;
}

interface NavItemsProps {
  items: {
    name: string;
    link: string;
    onClick?: () => void;
    isActive?: boolean;
  }[];
  className?: string;
  onItemClick?: () => void;
}

interface MobileNavProps {
  children: React.ReactNode;
  className?: string;
  visible?: boolean;
}

interface MobileNavHeaderProps {
  children: React.ReactNode;
  className?: string;
}

interface MobileNavMenuProps {
  children: React.ReactNode;
  className?: string;
  isOpen: boolean;
  onClose: () => void;
}

export const Navbar = ({ children, className }: NavbarProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollY } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const [visible, setVisible] = useState<boolean>(false);

  useMotionValueEvent(scrollY, "change", (latest) => {
    if (latest > 100) {
      setVisible(true);
    } else {
      setVisible(false);
    }
  });

  return (
    <motion.div
      ref={ref}
      // IMPORTANT: Change this to class of `fixed` if you want the navbar to be fixed
      className={cn("sticky inset-x-0 top-0 z-40 w-full", className)}
    >
      {React.Children.map(children, (child) =>
        React.isValidElement(child)
          ? React.cloneElement(
              child as React.ReactElement<{ visible?: boolean }>,
              { visible },
            )
          : child,
      )}
    </motion.div>
  );
};

export const NavBody = ({ children, className, visible }: NavBodyProps) => {
  return (
    <motion.div
      animate={{
        backdropFilter: visible ? "blur(10px)" : "none",
        boxShadow: visible
          ? "0 0 24px rgba(0, 255, 255, 0.1), 0 1px 1px rgba(0, 0, 0, 0.05), 0 0 0 1px rgba(0, 255, 255, 0.2), 0 0 4px rgba(0, 255, 255, 0.08), 0 16px 68px rgba(0, 0, 0, 0.3)"
          : "none",
        width: visible ? "40%" : "100%",
        y: visible ? 20 : 0,
      }}
      transition={{
        type: "spring",
        stiffness: 200,
        damping: 50,
      }}
      style={{
        minWidth: "800px",
      }}
      className={cn(
        "relative z-[60] mx-auto hidden w-full max-w-7xl flex-row items-center justify-between self-start rounded-full bg-transparent px-6 py-3 lg:flex dark:bg-transparent",
        visible && "bg-black/80 dark:bg-black/80 backdrop-blur-md",
        className,
      )}
    >
      {children}
    </motion.div>
  );
};

export const NavItems = ({ items, className, onItemClick }: NavItemsProps) => {
  const [hovered, setHovered] = useState<number | null>(null);

  return (
    <motion.div
      onMouseLeave={() => setHovered(null)}
      className={cn(
        "absolute inset-0 hidden flex-1 flex-row items-center justify-center space-x-3 text-base md:text-lg lg:text-xl font-medium text-zinc-600 transition duration-200 hover:text-zinc-800 lg:flex lg:space-x-3",
        className,
      )}
    >
      {items.map((item, idx) => (
        <a
          onMouseEnter={() => setHovered(idx)}
          onClick={(e) => {
            e.preventDefault();
            if (item.onClick) {
              item.onClick();
            } else if (onItemClick) {
              onItemClick();
            }
          }}
          className="relative px-5 py-2.5"
          style={{
            color: item.isActive ? '#2056AE' : '#2056AE',
            fontWeight: item.isActive ? 700 : 500,
          }}
          key={`link-${idx}`}
          href={item.link}
          aria-current={item.isActive ? "page" : undefined}
        >
          {hovered === idx && (
            <motion.div
              layoutId="hovered"
              className="absolute inset-0 h-full w-full rounded-full"
              style={{ backgroundColor: 'rgba(32, 86, 174, 0.1)' }}
            />
          )}
          {item.isActive && (
            <span
              className="absolute inset-x-8 -bottom-1 h-0.5 rounded-full"
              style={{ backgroundColor: '#2056AE' }}
            />
          )}
          <span className="relative z-20">{item.name}</span>
        </a>
      ))}
    </motion.div>
  );
};

export const MobileNav = ({ children, className, visible }: MobileNavProps) => {
  return (
    <motion.div
      animate={{
        backdropFilter: visible ? "blur(10px)" : "none",
        boxShadow: visible
          ? "0 0 24px rgba(0, 255, 255, 0.1), 0 1px 1px rgba(0, 0, 0, 0.05), 0 0 0 1px rgba(0, 255, 255, 0.2), 0 0 4px rgba(0, 255, 255, 0.08), 0 16px 68px rgba(0, 0, 0, 0.3)"
          : "none",
        width: visible ? "90%" : "100%",
        paddingRight: visible ? "12px" : "0px",
        paddingLeft: visible ? "12px" : "0px",
        borderRadius: visible ? "4px" : "2rem",
        y: visible ? 20 : 0,
      }}
      transition={{
        type: "spring",
        stiffness: 200,
        damping: 50,
      }}
      className={cn(
        "relative z-50 mx-auto flex w-full max-w-[calc(100vw-2rem)] flex-col items-center justify-between bg-transparent px-0 py-3 lg:hidden",
        visible && "bg-black/80 dark:bg-black/80 backdrop-blur-md",
        className,
      )}
    >
      {children}
    </motion.div>
  );
};

export const MobileNavHeader = ({
  children,
  className,
}: MobileNavHeaderProps) => {
  return (
    <div
      className={cn(
        "flex w-full flex-row items-center justify-between",
        className,
      )}
    >
      {children}
    </div>
  );
};

export const MobileNavMenu = ({
  children,
  className,
  isOpen,
  onClose: _onClose,
}: MobileNavMenuProps) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className={cn(
            "absolute inset-x-0 top-16 z-50 flex w-full flex-col items-start justify-start gap-4 rounded-lg bg-black/95 backdrop-blur-md px-4 py-8 shadow-[0_0_24px_rgba(0,_255,_255,_0.1),_0_1px_1px_rgba(0,_0,_0,_0.05),_0_0_0_1px_rgba(0,_255,_255,_0.2)] dark:bg-black/95",
            className,
          )}
        >
          {children}
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export const MobileNavToggle = ({
  isOpen,
  onClick,
}: {
  isOpen: boolean;
  onClick: () => void;
}) => {
  return isOpen ? (
    <IconX className="text-black dark:text-white cursor-pointer" onClick={onClick} />
  ) : (
    <IconMenu2 className="text-black dark:text-white cursor-pointer" onClick={onClick} />
  );
};

export const NavbarLogo = ({ onClick }: { onClick?: () => void }) => {
  return (
    <a
      href="#"
      onClick={(e) => {
        e.preventDefault();
        if (onClick) onClick();
      }}
      className="relative z-20 mr-4 flex items-center px-2 py-1 cursor-pointer flex-shrink-0"
      style={{ minWidth: '120px' }}
    >
      <img 
        src={tetrapakLogo} 
        alt="Tetra Pak" 
        className="h-10 w-auto"
        style={{ maxHeight: '56px' }}
      />
    </a>
  );
};

export const NavbarButton = ({
  href,
  as: Tag = "a",
  children,
  className,
  variant = "primary",
  ...props
}: {
  href?: string;
  as?: React.ElementType;
  children: React.ReactNode;
  className?: string;
  variant?: "primary" | "secondary" | "dark" | "gradient";
} & (
  | React.ComponentPropsWithoutRef<"a">
  | React.ComponentPropsWithoutRef<"button">
)) => {
  const baseStyles =
    "px-5 py-2.5 rounded-md text-base md:text-lg font-bold relative cursor-pointer hover:-translate-y-0.5 transition duration-200 inline-block text-center";

  const variantStyles = {
    primary:
      "text-white shadow-[0_0_24px_rgba(211,91,54,0.2),_0_1px_1px_rgba(0,0,0,0.05),_0_0_0_1px_rgba(211,91,54,0.3),_0_0_4px_rgba(211,91,54,0.1),_0_16px_68px_rgba(0,0,0,0.2)]",
    secondary: "bg-transparent shadow-none border border-cyan-500/30",
    dark: "bg-black text-white shadow-[0_0_24px_rgba(0,_255,_255,_0.1),_0_1px_1px_rgba(0,_0,_0,_0.05),_0_0_0_1px_rgba(0,_255,_255,_0.2),_0_0_4px_rgba(0,_255,_255,_0.08),_0_16px_68px_rgba(0,_0,_0,_0.3)]",
    gradient:
      "bg-gradient-to-b from-cyan-500 to-cyan-700 text-white shadow-[0px_2px_0px_0px_rgba(255,255,255,0.3)_inset]",
  };

  const backgroundColorStyle = variant === "primary" ? { backgroundColor: '#D35B36' } : {};

  return (
    <Tag
      href={href || undefined}
      className={cn(baseStyles, variantStyles[variant], className)}
      style={{ ...backgroundColorStyle, ...(props.style || {}) }}
      {...props}
    >
      {children}
    </Tag>
  );
};

