import ConfirmationCard from "apps/dashboard/src/components/common/confirmation-card";
import {
  useModalAction,
  useModalState,
} from "apps/dashboard/src/components/ui/modal/modal.context";
import { useDeleteTypeMutation } from "apps/dashboard/src/data/type/use-type-delete.mutation";

const TypeDeleteView = () => {
  const { mutate: deleteType, isLoading: loading } = useDeleteTypeMutation();

  const { data } = useModalState();
  const { closeModal } = useModalAction();
  async function handleDelete() {
    deleteType(data);
    closeModal();
  }
  return (
    <ConfirmationCard
      onCancel={closeModal}
      onDelete={handleDelete}
      deleteBtnLoading={loading}
    />
  );
};

export default TypeDeleteView;
