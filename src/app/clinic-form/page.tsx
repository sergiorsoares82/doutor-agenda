import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import AddClinicForm from "./components/add-clinic-form";

const ClinicFormPage = () => {
  return (
    <Dialog open={true}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Adicionar clínica</DialogTitle>
          <DialogDescription>
            Adicionar uma nova clínica para o seu perfil. Preencha os detalhes
          </DialogDescription>
        </DialogHeader>
        <AddClinicForm />
      </DialogContent>
    </Dialog>
  );
};

export default ClinicFormPage;
