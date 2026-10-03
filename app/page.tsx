import Image from "next/image"
import Link from "next/link"
import { connection } from "next/server";
import RegistrationForm from "@/app/form";

const HomePage = async () => {
  // Render at request time so runtime env vars are picked up in the Docker image
  await connection();
  return (
    <div className="w-full lg:grid lg:min-h-[600px] lg:grid-cols-2 xl:min-h-[800px]">
      <div className="flex items-center justify-center py-12">
        <div className="mx-auto grid w-[350px] gap-6">
          <div className="grid gap-2 text-center">
            { process.env.IMAGE_URL && (
              <Image
                src={process.env.IMAGE_URL}
                alt="Image"
                width="200"
                height="200"
                unoptimized
                className="lg:hidden mx-auto pb-8"
              />
            )}
            <h1 className="text-3xl font-bold">Mattermost-Registrierung</h1>
            <p className="text-balance text-muted-foreground">
              Gib deine E-Mail-Adresse ein, um einen persönlichen Einladungslink zu erhalten.
            </p>
            <RegistrationForm mailPlaceholder={process.env.MAIL_PLACEHOLDER} loginURL={process.env.LOGIN_URL}/>
          </div>
          {process.env.LOGIN_URL && (
            <div className="mt-4 text-center text-sm">
              Du hast schon einen Account?{" "}
              <Link href={process.env.LOGIN_URL} className="underline">
                Anmelden
              </Link>
            </div>
          )}
        </div>
      </div>
      { process.env.IMAGE_URL && (<div className="hidden lg:flex items-center justify-center py-12">
        <Image
          src={process.env.IMAGE_URL}
          alt="Image"
          width="500"
          height="500"
          unoptimized
          className="mx-auto align-middle max-w-[500px] max-h-[500px] object-center"
        />
      </div>
        )}
    </div>
  )
}

export default HomePage
