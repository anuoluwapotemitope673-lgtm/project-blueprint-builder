import { describe, it, expect } from 'vitest';
import { internSchema } from '@/lib/intern-validation';
const valid={full_name:'Emmanuella',profile_title:'Online Course Specialist',location:'United Kingdom',languages:['English','Dutch','Urdu'],bio:'',contact_link:'',slug:'emmanuella',status:'active',profile_picture_url:'',picture_path:''};
describe('intern profile rules',()=>{
 it('retains the supplied location and languages',()=>{const result=internSchema.parse(valid);expect(result.location).toBe('United Kingdom');expect(result.languages).toEqual(['English','Dutch','Urdu']);});
 it('allows missing contact links without inventing one',()=>{expect(internSchema.parse(valid).contact_link).toBe('');});
 it('rejects unsafe contact links',()=>{expect(internSchema.safeParse({...valid,contact_link:'javascript:alert(1)'}).success).toBe(false);});
 it('requires name title location and languages',()=>{for(const key of ['full_name','profile_title','location'])expect(internSchema.safeParse({...valid,[key]:''}).success).toBe(false);expect(internSchema.safeParse({...valid,languages:[]}).success).toBe(false);});
 it('preserves stable slugs when names change',()=>{expect(internSchema.parse({...valid,full_name:'New name'}).slug).toBe('emmanuella');});
 it('allows only active or inactive profiles',()=>{expect(internSchema.safeParse({...valid,status:'public'}).success).toBe(false);expect(internSchema.parse({...valid,status:'inactive'}).status).toBe('inactive');});
});