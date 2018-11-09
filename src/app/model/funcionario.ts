// Format by https://datos.hacienda.gov.py/odmh-api-v1/api-docs/
export interface funcionario {
  anio: string,
  mes: string,
  codigoNivel: number,
  descripcionNivel: string,
  codigoEntidad: number,
  descripcionEntidad: string,
  codigoPrograma: number,
  descripcionPrograma: string,
  codigoSubprograma: number,
  descripcionSubprograma:  string,
  codigoProyecto: number,
  descripcionProyecto: string,
  codigoUnidadResponsable: number,
  descripcionUnidadResponsable: string,
  codigoObjetoGasto: number,
  conceptoGasto: string,
  fuenteFinanciamiento: string,
  linea: number,
  codigoPersona: string,
  nombres: string,
  apellidos: string,
  sexo: string,
  discapacidad: string,
  codigoCategoria: string,
  cargo: string,
  horasCatedra: number,
  fechaIngreso: string,
  tipoPersonal: string,
  lugar: string,
  montoPresupuestado: number,
  montoDevengado: number,
  mesCorte: string,
  anioCorte: string,
  fechaCorte: string,
  nivelAbr: string,
  entidadAbr: string,
  programaAbr: string,
  subprogramaAbr: string,
  proyectoAbr: string,
  unidadAbr: string
}

export interface meta {
  pageSize: number,
  totalPages: number,
  totalCount: number
}

export interface results {
  datosFuncionarios: funcionario[];
  datosMeta: meta
}

