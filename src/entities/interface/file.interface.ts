import {
	Column,
	Unique,
} from 'typeorm'
import {
	Expose,
	plainToInstance,
} from 'class-transformer'
import { IBase, } from './base.interface'

@Unique("UNI_images_path_filename", ['path', 'filename'])
export abstract class File extends IBase<File> {

	@Expose()
	@Column()
	filename: string

	@Expose()
	@Column()
	path: string

	// constructor(file: Partial<File>) {
	// 	super(file)
	// 	if (file) {
	// 		Object.assign(
	// 			this,
	// 			plainToInstance(File, file, {
	// 				excludeExtraneousValues: true
	// 			})
	// 		)
	// 	}
	// }
}
