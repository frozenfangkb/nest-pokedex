import { Module } from '@nestjs/common';
import { SeedService } from './seed.service';
import { SeedController } from './seed.controller';
import { PokemonModule } from 'src/pokemon/pokemon.module';
import { PokemonService } from 'src/pokemon/pokemon.service';
import { CommonModule } from 'src/common/common.module';
import { AxiosAdapter } from 'src/common/adapters/axios.adapter';

@Module({
  imports: [PokemonModule, CommonModule],
  controllers: [SeedController],
  providers: [SeedService, PokemonService, AxiosAdapter],
})
export class SeedModule {}
