"use client";

import { useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import type { Account, PanelAction } from "@/lib/panel";
import { usePanel } from "./panel-provider";
import { inputClass, panelCard, PanelHeading, PanelNotice, primaryButton, secondaryButton } from "./panel-ui";
import { usePanelTask } from "./use-panel-task";

export function Profile() {
  const { data } = usePanel();
  const account = data?.account;
  if (!account) return null;
  return <ProfileForms key={account.id} account={account} />;
}

function ProfileForms({ account }: { account: Account }) {
  const router = useRouter();
  const details = usePanelTask();
  const password = usePanelTask();
  const deletion = usePanelTask();
  const [savedDetails, setSavedDetails] = useState(false);
  const [savedPassword, setSavedPassword] = useState(false);

  async function saveDetails(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    setSavedDetails(await details.run({ action: "rename", name: String(form.get("name")) }));
  }

  async function changePassword(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const element = event.currentTarget;
    const form = new FormData(element);
    const action: PanelAction = {
      action: "password",
      currentPassword: String(form.get("currentPassword")),
      password: String(form.get("password")),
    };
    const success = await password.run(action);
    setSavedPassword(success);
    if (success) element.reset();
  }

  async function deleteAccount(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    if (await deletion.run({ action: "delete", password: String(form.get("password")) })) {
      router.replace("/panel/logowanie");
    }
  }

  const labelClass = "grid gap-1.5 text-sm font-semibold";
  return (
    <>
      <PanelHeading title="Moje konto">Zarządzaj danymi i hasłem swojego konta demonstracyjnego.</PanelHeading>
      <div className="grid items-start gap-5 xl:grid-cols-2">
        <form onSubmit={saveDetails} className={panelCard + " space-y-4"}>
          <h2 className="text-lg font-semibold">Dane konta</h2>
          <label className={labelClass}>
            Nazwa wyświetlana
            <input key={account.name} className={inputClass} name="name" defaultValue={account.name} minLength={2} maxLength={80} autoComplete="nickname" required />
          </label>
          <dl className="text-sm">
            <dt className="font-semibold">Adres e-mail</dt>
            <dd className="mt-1 break-all text-gray-600">{account.email}</dd>
          </dl>
          {details.error && <PanelNotice error>{details.error}</PanelNotice>}
          {savedDetails && <PanelNotice>Zapisano dane konta.</PanelNotice>}
          <button disabled={details.busy} className={primaryButton}>Zapisz nazwę</button>
        </form>

        <form onSubmit={changePassword} className={panelCard + " space-y-4"}>
          <h2 className="text-lg font-semibold">Zmiana hasła</h2>
          <label className={labelClass}>
            Aktualne hasło
            <input className={inputClass} name="currentPassword" type="password" autoComplete="current-password" maxLength={128} required />
          </label>
          <label className={labelClass}>
            Nowe hasło
            <input className={inputClass} name="password" type="password" autoComplete="new-password" minLength={8} maxLength={128} required />
            <span className="text-xs font-normal text-gray-500">Minimum 8 znaków.</span>
          </label>
          {password.error && <PanelNotice error>{password.error}</PanelNotice>}
          {savedPassword && <PanelNotice>Zmieniono hasło.</PanelNotice>}
          <button disabled={password.busy} className={primaryButton}>Zmień hasło</button>
        </form>
      </div>

      <details className={panelCard + " mt-5"}>
        <summary className="cursor-pointer font-semibold text-red-800">Usuń konto demonstracyjne</summary>
        <form onSubmit={deleteAccount} className="mt-4 max-w-md space-y-4">
          <p className="text-sm leading-6 text-gray-600">Usunięcie konta usuwa też zapisane wycieczki, sesje i historię rezerwacji.</p>
          <label className={labelClass}>
            Aktualne hasło
            <input className={inputClass} name="password" type="password" autoComplete="current-password" maxLength={128} required />
          </label>
          <label className="flex items-start gap-2 text-sm">
            <input type="checkbox" required className="mt-1" />
            Potwierdzam usunięcie konta.
          </label>
          {deletion.error && <PanelNotice error>{deletion.error}</PanelNotice>}
          <button disabled={deletion.busy} className={secondaryButton + " !text-red-800"}>Usuń konto</button>
        </form>
      </details>
    </>
  );
}
