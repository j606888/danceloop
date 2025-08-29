import Link from "next/link";

const LoginPage = () => {
  return (
    <div>
      <div className="flex items-center gap-1 h-[54px] px-4 mb-8">
        <img src="/icons/Logo.svg" alt="DanceLoop Logo" />
        <h4 className="text-xl font-bold tracking-tight">DanceLoop</h4>
      </div>
      <div className="flex flex-col gap-6 px-6">
        <div className="flex flex-col gap-2">
          <h1 className="text-[32px] font-bold text-[#232323] leading-[32px]">
            Welcome back!
          </h1>
          <p className="text-[#777777]">Enter your login information</p>
        </div>
        <button className="flex items-center justify-center gap-2.5 py-4 border-1 rounded-[10px] border-[#E5E5E5] cursor-pointer">
          <img src="/icons/google.svg" alt="Google" />
          <span>Login with Google</span>
        </button>
        <div className="flex items-center gap-3">
          <div className="border-[#E5E5E5] border-b w-1/2"></div>
          <span>OR</span>
          <div className="border-[#E5E5E5] border-b w-1/2"></div>
        </div>
        <form className="flex flex-col gap-3">
          <div className="flex flex-col gap-1">
            <label className="text-[#444444] text-sm" htmlFor="email">
              Email
            </label>
            <input
              className="w-full h-[42px] px-4 rounded-[10px] border-1 border-[#E5E5E5] outline-[#6784F6]"
              type="email"
              id="email"
              name="email"
              placeholder="Email"
            />
          </div>
          <div className="flex flex-col gap-1">
            <label className="text-[#444444] text-sm" htmlFor="password">
              Password
            </label>
            <input
              className="w-full h-[42px] px-4 rounded-[10px] border-1 border-[#E5E5E5] outline-[#6784F6]"
              type="password"
              id="password"
              name="password"
              placeholder="Password"
            />
          </div>
          <div className="flex items-center gap-2 mb-2">
            <input
              type="checkbox"
              id="remember"
              name="remember"
              className="accent-[#6784F6] border-[#6784F6] w-4 h-4 rounded-sm cursor-pointer"
            />
            <label htmlFor="remember" className="text-[#444444] text-sm cursor-pointer">
              Remember me
            </label>
          </div>
          <button
            className="w-full h-[42px] bg-[#6784F6] text-white font-semibold rounded-[10px] cursor-pointer"
            type="submit"
          >
            Login
          </button>
          <p className="text-sm text-[#232323] text-center cursor-pointer">Don{`'`}t have an account? <Link href="/signup" className="text-[#6784F6] underline">Sign up</Link></p>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
