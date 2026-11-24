import { IsNotEmpty, IsString, IsUUID, IsOptional } from 'class-validator';

export class CreateParkingSpotDto {
    @IsString()
    @IsNotEmpty({ message: 'El código del parkingspot es obligatorio' })
    code: string;

    @IsString()
    @IsNotEmpty({ message: 'El tipo de cargador es obligatorio' })
    charger_type: string;

    @IsUUID('4', { message: 'El id_supervisor debe ser un UUID válido' })
    @IsOptional()
    id_supervisor?: string;
}