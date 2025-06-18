import { redirect } from "next/navigation";
import { getPermissionUserToReports } from "./_data_access/get-permission-reports";

export default async function Reports() {
  const user = await getPermissionUserToReports();

  if (!user) {
    return (
      <main>
        <h1>Pagina de relatorios</h1>
        <div>
          <p>Você não tem permissão para acessar essa pagina.</p>
          <p>
            Assine o plano Empresa e tenha acesso aos relatorios completos dos
            seus agendamentos.
          </p>
        </div>
      </main>
    );
  }

  return (
    <main>
      <h1>Pagina de relatorios</h1>
    </main>
  );
}
