import { describe, expect, it } from 'vitest';
import { resolveAuthProviderConfig } from './provider-config';

describe('resolveAuthProviderConfig', () => {
  it('enables Google only when both credentials exist', () => {
    expect(
      resolveAuthProviderConfig({
        AUTH_GOOGLE_ID: 'client-id',
        AUTH_GOOGLE_SECRET: 'client-secret',
      }),
    ).toEqual({
      googleEnabled: true,
      resendEnabled: false,
      resendFrom: null,
    });
  });

  it('enables Resend only when its key and sender exist', () => {
    expect(
      resolveAuthProviderConfig({
        AUTH_RESEND_KEY: 're_test',
        AUTH_EMAIL_FROM: 'Grado Cero <acceso@example.com>',
      }),
    ).toEqual({
      googleEnabled: false,
      resendEnabled: true,
      resendFrom: 'Grado Cero <acceso@example.com>',
    });
  });

  it('keeps incomplete providers disabled', () => {
    expect(
      resolveAuthProviderConfig({
        AUTH_GOOGLE_ID: 'client-id',
        AUTH_RESEND_KEY: 're_test',
      }),
    ).toEqual({
      googleEnabled: false,
      resendEnabled: false,
      resendFrom: null,
    });
  });
});
