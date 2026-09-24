import { ElNotification } from 'element-plus';
import enumMessageStatus from '@/models/enums/enumMessageType';

type TOption = {
  title?: string,
  traceId?: number,
}

const notification = (message: string, type: enumMessageStatus, title?: string, traceId?: number): void => {
  ElNotification({
    title,
    message: `${message}${traceId ? ` (${traceId})` : ''}`,
    type,
    duration: 3000,
  });
};

const createNotification = (type: enumMessageStatus) => (message: string, opts: TOption = {}): void => {
  const { title, traceId } = opts;
  notification(message, type, title, traceId);
};

export const success = createNotification(enumMessageStatus.Success);
export const error = createNotification(enumMessageStatus.Error);
const info = createNotification(enumMessageStatus.Info);
const warning = createNotification(enumMessageStatus.Warning);

export default {
  notification,
  success,
  error,
  info,
  warning,
};
