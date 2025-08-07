import { currentUser } from "@clerk/nextjs/server";
import { ConvexHttpClient } from "convex/browser";
import { api } from "../../../../convex/_generated/api";
import Link from "next/link";
import { Blocks, Code2, Sparkles } from "lucide-react";
import { SignedIn } from "@clerk/nextjs";
import ThemeSelector from "./ThemeSelector";
import LanguageSelector from "./LanguageSelector";
import RunButton from "./RunButton";
import HeaderProfileBtn from "./HeaderProfileBtn";
import "../_styles/Header.css"

async function Header() {
  const convex = new ConvexHttpClient(process.env.NEXT_PUBLIC_CONVEX_URL!);
  const user = await currentUser();

  const convexUser = await convex.query(api.users.getUser, {
    userId: user?.id || "",
  });

  return (
    <div className="header-container">
      <div className="header-inner">
        <div className="nav-left">
          <Link href="/" className="logo-link group">
            <div className="logo-hover" />
            <div className="logo-icon">
              <Blocks className="logo-block-icon" />
            </div>
            <div className="logo-text">
              <span className="logo-title">CodeCraft</span>
              <span className="logo-subtitle">Interactive Code Editor</span>
            </div>
          </Link>

          <nav className="nav-links">
            <Link href="/snippets" className="nav-button group">
              <div className="nav-button-bg" />
              <Code2 className="nav-icon" />
              <div className="nav-label">Snippets</div>
            </Link>
          </nav>
        </div>

        <div className="nav-right">
          <div className="selectors">
            <ThemeSelector />
            <LanguageSelector hasAccess={true} />
          </div>

          {!convexUser?.isPro && (
            <Link href="/pricing" className="pro-button">
              <Sparkles className="pro-icon" />
              <span className="pro-label">Sign In To Run Code</span>
            </Link>
          )}

          <SignedIn>
            <RunButton />
          </SignedIn>

          <div className="profile-btn-wrapper">
            <HeaderProfileBtn />
          </div>
        </div>
      </div>
    </div>
  );
}
export default Header;
