import * as moment from 'moment';
import { Echannel } from 'src/common/utils/enums/params.enum';
import { IParam } from 'src/core/entity/param/param.entity';

export const PARAM_CHANNEL: IParam[] = [
    {
        id_param: Echannel.EC9_B2C,
        description: 'Canal correspondiente a B2C',
        status: true,
        createdUser: 'admin',
        updatedUser: 'admin',
        createdAt: moment().format(),
        updatedAt: moment().format(),
        values: 'EC9_B2C'
    },
];