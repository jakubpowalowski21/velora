import { useState } from "react";

export default function Newsletter() {
  const [followed, setFollowed] = useState(false);

  return (
    <div>
      <h1 className="font-semibold text-xl">Odkrywaj więcej z VELORA</h1>
      <p className="text-gray-500">
        Zapisz się do newslettera i otrzymuj inspiracje podróżnicze oraz
        informacje o nowych kierunkach.
      </p>
      {followed ? (
        <>
          <p className="hidden md:inline-block mt-2 text-white px-4 py-2 font-medium bg-[#454545] rounded-full">
            Dziękujemy! Sprawdź swoją skrzynkę i potwierdź adres e-mail.
          </p>
          <p className="inline-block md:hidden mt-2 text-white px-4 py-2 font-medium bg-[#454545] rounded-xl">
            Dziękujemy! <br />
            Sprawdź swoją skrzynkę i potwierdź adres e-mail.
          </p>
        </>
      ) : (
        <form
          onSubmit={(event) => {
            event.preventDefault();
            setFollowed(true);
          }}
        >
          <input
            type="email"
            placeholder="Twój adres e-mail"
            required
            className="mt-2 w-1/2 border rounded-full border-gray-500 placeholder-gray-500 px-4 py-2 focus:outline-none"
          />
          <button
            type="submit"
            className="ml-4 px-4 py-2 rounded-full bg-[#454545] cursor-pointer"
          >
            Zapisz się
          </button>
        </form>
      )}
    </div>
  );
}
