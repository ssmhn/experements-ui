import * as t from 'io-ts';
import {isLeft} from "fp-ts/Either";

// eslint-disable-next-line
export type LocalAnyType = any;

export type SelectType = {
    value: string,
    label: string
}

export type ParamType = {
    name: string,
    value?: string | Record<string, string>
    type?: string
}

export type StatusType =
    'CREATE' |
    'TRAIN' |
    'PREDICT' |
    'SENT_FOR_CREATE' |
    'SENT_FOR_TRAIN' |
    'SENT_FOR_PREDICT' |
    'CREATED' |
    'TRAINED' |
    'PREDICTED' |
    'TRAIN_WITH_CROSSVALIDATION'

type LocalDTOType = { id?: string | number };

export class TypeHelper {
    /**
     * Создания типа enums для io-ts
     */
    static createEnum = <E>(e: LocalAnyType, name: string): t.Type<E> => {
        const keys: LocalAnyType = {};
        Object.keys(e).forEach((k: string) => (keys[e[k]] = null));
        return t.keyof(keys, name) as LocalAnyType;
    };

    /**
     * Показать ошибку в консоли о несоответствии типов
     */
    static showConsoleError = (
        idEntity: string | number | undefined,
        entity: LocalAnyType,
        classEntity: string,
        result: LocalAnyType,
    ): void => {
        if (typeof window === 'undefined') {
            return;
        }
        window.console.log('');
        window.console.log('============== io-ts start error =============');
        window.console.log(
            `Произошла ошибка при обработке данных, полученных с сервера. Сущность: ${classEntity}, id сущности: ${idEntity}`,
        );
        window.console.log(entity);
        result.left.forEach((value: LocalAnyType) => {
            let context = '';
            value.context.forEach((ctx: LocalAnyType) => {
                context = `${context}${ctx.key} `;
            });
            window.console.log(`Значение: ${value.value}, key: ${context}`);
        });
        window.console.log('============== io-ts end error =============');
        window.console.log('');
    };

    /**
     * Проверяем один элемент
     */
    static checkElement<M, DTO extends LocalDTOType>(
        entityType: t.TypeC<LocalAnyType> | t.Type<LocalAnyType> | t.RecordC<LocalAnyType, LocalAnyType>,
        entityClass: LocalAnyType,
        entityName: string,
        entity: DTO,
    ): M | null {
        const result = entityType.decode(entity);
        if (isLeft(result)) {
            TypeHelper.showConsoleError(entity.id, entity, entityName, result);
            return null;
        }
        return new entityClass(entity);
    }

    /**
     * Проверяем элементы в массиве
     */
    static checkElementsArray<M, DTO extends LocalDTOType>(
        entityType: t.TypeC<LocalAnyType> | t.Type<LocalAnyType> | t.RecordC<LocalAnyType, LocalAnyType>,
        entityClass: LocalAnyType,
        entityName: string,
        array: DTO[],
    ): M[] {
        return array
            .map((item: LocalAnyType) => TypeHelper.checkElement<M, DTO>(entityType, entityClass, entityName, item))
            .filter((el: M | null): el is M => !!el);
    }
}