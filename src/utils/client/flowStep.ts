import { FLOW_STEP_COOKIE } from '@/config/constants/flowConfig';

export const setFlowStep = (route: string): void => {
  document.cookie = `${FLOW_STEP_COOKIE}=${route}; path=/; SameSite=Lax`;
};

export const clearFlowStep = (): void => {
  document.cookie = `${FLOW_STEP_COOKIE}=; path=/; max-age=0; SameSite=Lax`;
};
