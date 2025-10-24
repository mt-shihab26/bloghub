<?php

namespace App\Filament\Resources\Users\Pages;

use App\Filament\Resources\Users\UserResource;
use App\Models\User;
use Filament\Actions\CreateAction;
use Filament\Resources\Pages\ManageRecords;

class ManageUsers extends ManageRecords
{
    protected static string $resource = UserResource::class;

    protected function getHeaderActions(): array
    {
        return [
            CreateAction::make(),
        ];
    }

    protected function mutateFormDataBeforeSave(array $data): array
    {
        if (isset($data['avatar']) && ! is_string($data['avatar'])) {
            /** @var User $record */
            $record = $this->record;

            if ($record && $data['avatar']) {
                $record->uploadAvatar($data['avatar']);
            }
        }

        unset($data['avatar']);

        return $data;
    }
}
