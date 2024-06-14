import { PersonaDBContext, Persona } from "../capa_acceso_datos/Persona"; 

export class GestorPersona {
  private PersonaDBContext: PersonaDBContext;
  constructor() {
    this.PersonaDBContext = new PersonaDBContext();
  }
  
  async obtenerPersonaPorId(id: number): Promise<Persona | null> {
    const persona = await this.PersonaDBContext.seleccionarPersonaPorId(id);
    return persona;
  }
  
}