type AuthEnvironment = Record<string, string | undefined>;

export function resolveAuthProviderConfig(environment: AuthEnvironment) {
  const googleEnabled = Boolean(
    environment.AUTH_GOOGLE_ID && environment.AUTH_GOOGLE_SECRET,
  );
  const resendEnabled = Boolean(
    environment.AUTH_RESEND_KEY && environment.AUTH_EMAIL_FROM,
  );

  return {
    googleEnabled,
    resendEnabled,
    resendFrom: resendEnabled ? environment.AUTH_EMAIL_FROM! : null,
  };
}
