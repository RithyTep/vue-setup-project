import EnumMessageType from '@/models/enums/enumMessageType';
import { ElMessageBox } from 'element-plus';

const confirm = async (type: EnumMessageType, callback: () => Promise<void>, content = "Are you sure") => {
  ElMessageBox.confirm(content, {
    dangerouslyUseHTMLString: true,
    confirmButtonText: 'Okay',
    type,
    showCancelButton: false,
    beforeClose: async (action, instance, done) => {
      if (action === 'confirm') {
        instance.confirmButtonLoading = true;
        await callback();
        instance.confirmButtonLoading = false;
        done();
      } else {
        done();
      }
    },
  });
};

export default confirm;
