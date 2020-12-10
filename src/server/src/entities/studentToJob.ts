import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { Student } from '../entities/student';
import { Job } from '../entities/job';

@Entity()
export class StudentToJob {
    @PrimaryGeneratedColumn()
    public id: number;

    @Column()
    public date: Date;

    @ManyToOne(type => Job, job => job.studentToJob)
    public job: Job;

    @ManyToOne(type => Student, student => student.studentToJob)
    public student: Student;
}