import {
  SignedIn,
  SignedOut,
  SignInButton,
  UserButton,
  useUser,
} from "@clerk/nextjs";

export default function HeaderAuth() {
  const { user } = useUser();
  return (
    <>
      <SignedOut>
        <div className="header__top__right__auth">
          <SignInButton>
            <button>
              <i className="fa fa-user"></i> Login
            </button>
          </SignInButton>
        </div>
      </SignedOut>

      <SignedIn>
        <div className="header__top__right__auth flex items-center justify-center">
          <UserButton />
          <h4 style={{ fontSize: "16px", margin: 0, fontWeight: 600 }}>
            {user?.fullName}
          </h4>
        </div>
      </SignedIn>
    </>
  );
}
