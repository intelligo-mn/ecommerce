import ConfirmationCard from "apps/dashboard/components/common/confirmation-card";
import {
  useModalAction,
  useModalState,
} from "apps/dashboard/components/ui/modal/modal.context";
import { useBlockUserMutation } from "apps/dashboard/data/user/use-user-block.mutation";
import { useUnblockUserMutation } from "apps/dashboard/data/user/use-user-unblock.mutation";

const CustomerBanView = () => {
  const { mutate: blockUser, isLoading: loading } = useBlockUserMutation();
  const { mutate: unblockUser, isLoading: activeLoading } =
    useUnblockUserMutation();

  const { data } = useModalState();
  const { closeModal } = useModalAction();

  async function handleDelete() {
    if (data?.type === "ban") {
      blockUser(data?.id);
    } else {
      unblockUser(data?.id);
    }
    closeModal();
  }
  return (
    <ConfirmationCard
      onCancel={closeModal}
      onDelete={handleDelete}
      deleteBtnText={data?.type === "ban" ? "Block" : "Unblock"}
      title={data?.type === "ban" ? "Block Customer" : "Unblock Customer"}
      description="Are you sure you want to block this customer?"
      deleteBtnLoading={loading || activeLoading}
    />
  );
};

export default CustomerBanView;
