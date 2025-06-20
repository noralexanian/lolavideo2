import { VideoTemplate } from '../types';
import { Video1Template } from './Video1';
import { Video2Template } from './Video2';
import { Video3Template } from './Video3';
import { Video4Template } from './Video4';
import { Video5Template } from './Video5';
import { Video6Template } from './Video6';
import { Video7Template } from './Video7';
import { Video8Template } from './Video8';
import { Video9Template } from './Video9';

export const templates: VideoTemplate[] = [
  Video1Template,
  Video2Template,
  Video3Template,
  Video4Template,
  Video5Template,
  Video6Template,
  Video7Template,
  Video8Template,
  Video9Template,
];

export function getTemplateById(id: string): VideoTemplate | undefined {
  return templates.find(template => template.id === id);
}

export function getAllTemplateIds(): string[] {
  return templates.map(template => template.id);
}