import React from "react";
import { teamMembers } from "../../data/team";
import Project from "./project/Project";
import Contact from "../../components/contact/Contact";
import Carrousel from "../../components/carrousel/Carrousel";
import RefugiosList from "./cardRefugio/RefugiosList";

export default function SobreNosotros() {
  return (
    <>
      <Carrousel />
      {/* Team section */}
      <main className="container mx-auto px-4 py-8">
        <section id="team" className=" ">
          <div className="container mx-auto px-6">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Quiénes Somos
              </h2>
              <div className="w-20 h-1 bg-purple-600 mx-auto mb-6"></div>
              <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                Somos un equipo multidisciplinario de 5 profesionales
                comprometidos con desarrollar soluciones tecnológicas
                innovadoras. Combinamos nuestras habilidades para crear
                herramientas que simplifiquen los procesos empresariales.
              </p>
            </div>

            <div
              id="team-container"
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10"
            >
              {teamMembers.map((member, index) => (
                <div
                  key={member.id || index}
                  className="team-card bg-white rounded-xl overflow-hidden shadow-lg transition duration-500 ease-in-out"
                >
                  <div
                    className={`h-48 bg-gradient-to-r ${member.color} flex items-center justify-center`}
                  >
                    <img
                      src={member.image}
                      alt={`Foto de ${member.name}`}
                      className="h-32 w-32 rounded-full border-4 border-white object-cover"
                    />
                  </div>
                  <div className="p-6 text-center">
                    <h3 className="text-xl font-bold">{member.name}</h3>
                    <p className={`${member.textColor} mb-4`}>{member.role}</p>
                    <p className="text-gray-600 mb-6">{member.description}</p>
                    <a
                      href={member.portfolio}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`inline-block px-6 py-2 ${member.bgColor} text-white rounded-full ${member.hoverColor} transition`}
                    >
                      Ver portafolio <i className="fas fa-arrow-right ml-2"></i>
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>

      {/* Project section */}
      <Project />
      <RefugiosList />
    </>
  );
}
