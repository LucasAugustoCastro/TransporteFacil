import { getRepository } from 'typeorm';
import Regiao from '../models/Regiao';

interface Request {
  origem: string;
  destino: string;
}
class CreateRotaService {
  public async execute({ origem, destino }: Request): Promise<Regiao[]> {
    const regiaoRepository = getRepository(Regiao);
    const rotas = await regiaoRepository.find({
      where: { origem, destino },
    });

    return rotas;
  }
}
export default CreateRotaService;
