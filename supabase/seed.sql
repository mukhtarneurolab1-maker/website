-- Launch content for Mukhtar Lab. Run after schema.sql.
-- Safe to re-run: existing slugs/titles are left in place via conflict skips where possible.

insert into public.research_items
  (slug, title, card_title, card_summary, subtitle, question, body, extra_line, image_url, image_caption, accent, sort_order, published)
values
('human-brain-development', 'Human Brain Development', 'Human Brain Development', 'Molecular logic of cortical development and cellular diversity.', 'Decoding the molecular logic of human cortical development', 'How does the human brain generate its extraordinary cellular diversity?', 'This theme investigates the molecular and transcriptional programs that regulate neural progenitor proliferation, cell-fate specification, neuronal differentiation and cortical organization during human development. It frames how the human cortex becomes unique, and how those programs can fail.', null, '/images/lab/theme-development.jpg', 'Cortical neurons · Fluorescence field', 'cyan', 1, true),
('rna-biology', 'RNA Biology & Isoform Diversity', 'RNA Biology & Isoforms', 'How alternative splicing shapes identity and disease risk.', 'Beyond genes: the complexity of RNA isoforms', 'How does RNA processing create molecular diversity that shapes fate and disease?', 'The genome provides the blueprint; RNA processing creates enormous molecular diversity. A major focus is alternative splicing and isoform diversity during human brain development and in neurological disease, and how changes in RNA processing alter cellular identity, trajectories and susceptibility.', null, '/images/lab/theme-rna.jpg', 'RNA splicing · Isoform diversity', 'magenta', 2, true),
('organoids', 'Human Brain Organoids & Assembloids', 'Organoids & Assembloids', 'Human brain models: cortical, interneuron and vascular systems.', 'Building the human brain in a dish', 'How can human-relevant models capture interactions animal systems miss?', 'Patient-derived and human iPSC-derived cortical, interneuron and vascular organoids, and increasingly complex assembloids, model development and disease in a genetically authentic human context, enabling mechanism studies and therapeutic testing.', null, '/images/lab/theme-organoids.jpg', 'Human cerebral organoids · Culture systems', 'amber', 3, true),
('single-cell', 'Single-Cell & Spatial Neuroscience', 'Single-Cell & Spatial', 'Mapping development and disease at single-cell resolution.', 'Mapping the human brain at single-cell resolution', 'How do we connect genes to circuits across development and disease?', 'Single-cell, single-nucleus and spatial technologies map cellular and molecular diversity across stages and disease states, connecting:', 'Genes → RNA → Cell States → Cellular Interactions → Neural Circuits → Disease Phenotypes', '/images/lab/theme-spatial.jpg', 'Cellular architecture · Multicolor fluorescence', 'cyan', 4, true),
('disease', 'Neurodevelopmental & Psychiatric Disorders', 'Neurodevelopmental Disease', 'Autism, Down syndrome, bipolar disorder and schizophrenia.', 'From developmental biology to disease mechanisms', 'How do early developmental disruptions become clinical disease?', 'Many neurological and psychiatric disorders have roots in early development. This work investigates Autism Spectrum Disorder, Down syndrome, bipolar disorder and schizophrenia, combining patient-derived iPSCs with multi-organoid models and multimodal profiling to explain why patients with the same diagnosis can show very different biology.', null, '/images/lab/theme-disease.jpg', 'Spiny neuron · Confocal microscopy', 'magenta', 5, true),
('precision-psychiatry', 'Precision Psychiatry', 'Precision Psychiatry', 'Biological subtypes and mechanism-based therapies.', 'From patient heterogeneity to precision medicine', 'Can we define biological subtypes that guide mechanism-based therapy?', 'Two patients with the same diagnosis may have different underlying mechanisms. The long-term vision combines clinical phenotyping, patient-derived iPSCs, organoids, single-cell genomics, functional phenotyping and computation to identify biological subtypes and develop mechanism-based strategies.', null, '/images/lab/theme-brain.jpg', 'Human brain · Systems-level insight', 'amber', 6, true)
on conflict (slug) do nothing;

insert into public.publications
  (authors, title, venue, year_label, note, doi_url, image_url, category, featured, sort_order, published)
values
('Palacios Moriano J, Mukhtar T, et al.', 'A multimodal atlas of Broca''s area in the developing human brain.', 'Cell', '2026', 'In revision', null, '/images/lab/theme-brain.jpg', 'first', false, 1, true),
('Mukhtar T, Siebert CV, Wang Y, Pebworth MP, White ML, Li J, Kriegstein AR.', 'α7 nicotinic acetylcholine receptors regulate radial glia fate in the developing human cortex.', 'Nature Communications', '2025', null, 'https://doi.org/10.1038/s41467-025-61167-5', '/images/lab/pubs/pub-radial-glia.jpg', 'first', true, 2, true),
('Mukhtar T, Taylor V.', 'Dynamic transcriptional programs define distinct mammalian cortical lineages.', 'Neural Regeneration Research', '2024', null, 'https://doi.org/10.4103/1673-5374.377589', '/images/lab/theme-rna.jpg', 'first', false, 3, true),
('Mukhtar T, Taylor V.', 'Temporal and sequential transcriptional dynamics define lineage shifts in corticogenesis.', 'The EMBO Journal', '2022', null, null, '/images/lab/pubs/pub-radial-dev.jpg', 'first', false, 4, true),
('Andrews M, Mukhtar T, et al.', 'Tropism of SARS-CoV-2 for Developing Human Cortical Astrocytes.', 'PNAS', '2022', null, 'https://doi.org/10.1073/pnas.2122236119', '/images/lab/pubs/pub-astrocyte.jpg', 'first', false, 5, true),
('Mukhtar T, et al.', 'Tead transcription factors differentially regulate cortical development.', 'Scientific Reports', '2020', null, null, '/images/lab/pubs/pub-tf-dna.jpg', 'first', false, 6, true),
('Mukhtar T, Taylor V.', 'Untangling Cortical Complexity During Development.', 'Journal of Experimental Neuroscience', '2018', null, null, '/images/lab/pubs/pub-pc12.jpg', 'first', false, 7, true),
('Wu T, Jiang L, Mukhtar T, et al.', 'Single Cell Proteomics in the Developing Human Brain.', 'Nature Biotechnology', '2026', null, 'https://doi.org/10.1038/s41587-025-02980-7', '/images/lab/pubs/pub-scrna.jpg', 'collaborative', false, 1, true),
('Wang JC, Sanchez D, et al., including Mukhtar T.', 'Spatially resolved molecular cartography reveals specialized cell ensembles in the human brain vasculature.', 'Cell', '2026', null, null, '/images/lab/pubs/pub-organoid2.jpg', 'collaborative', false, 2, true),
('Wang L, Moriano JA, Chen S, et al., including Mukhtar T.', 'Molecular and cellular dynamics of the developing human neocortex.', 'Nature', '2025', null, 'https://doi.org/10.1038/s41586-024-08351-7', '/images/lab/pubs/pub-neocortex.jpg', 'collaborative', false, 3, true),
('Mostajo-Radji MA, Leon WRM, et al., including Mukhtar T.', 'Fate plasticity of interneuron specification.', 'iScience', '2025', null, 'https://doi.org/10.1016/j.isci.2025.112295', '/images/lab/pubs/pub-interneuron-glia.jpg', 'collaborative', false, 4, true),
('Ifflander N, Rolando C, Balta EA, Mukhtar T, et al.', 'Safb1 regulates cell fate determination in the adult brain by enhancing mRNA cleavage.', 'eLife', '2024', null, null, '/images/lab/pubs/pub-genome-tf.jpg', 'collaborative', false, 5, true),
('Andrews MG, Siebert C, Wang L, et al., including Mukhtar T.', 'LIF signaling regulates outer radial glia to interneuron fate during human cortical development.', 'Cell Stem Cell', '2023', null, 'https://doi.org/10.1016/j.stem.2023.08.009', '/images/lab/theme-organoids.jpg', 'collaborative', false, 6, true),
('Crawford E, … Mukhtar T, … Derisi J.', 'Rapid deployment of SARS-CoV-2 testing: the CLIAHUB.', 'PLoS Pathogens', '2020', null, null, '/images/lab/pubs/pub-sars.jpg', 'collaborative', false, 7, true),
('Zhang C, Tu HL, Jia G, Mukhtar T, et al.', 'Ultra-Multiplexed Analysis of Single Cell Dynamics Reveals Logic Rules in Differentiation.', 'Science Advances', '2019', null, null, '/images/lab/theme-spatial.jpg', 'collaborative', false, 8, true),
('Robert Beattie, Mukhtar T, Verdon Taylor et al.', 'Fundamentals of neurogenesis and neural stem cell development.', 'Neural Surface Antigens. Elsevier', '2014', 'Book chapter', null, '/images/lab/theme-development.jpg', 'chapter', false, 1, true);

insert into public.awards
  (year_label, title, detail, category, sort_order, published)
values
('2026', 'Prime Minister''s Early Career Research Grant (PMECRG)', 'ANRF, Government of India · Principal Investigator', 'fellowship', 1, true),
('2025', 'Ramanujan Fellowship', 'Department of Science & Technology, Government of India', 'fellowship', 2, true),
('2023', 'Independent Postdoctoral Research Award', 'Institute of Regenerative Medicine, UCSF · PI', 'fellowship', 3, true),
('2019–2021', 'SNSF Early Postdoc Mobility Fellowship', 'Swiss National Science Foundation', 'fellowship', 4, true),
('2013–2017', 'ESKAS Swiss Government Excellence Scholarship', 'Swiss Confederation · PhD Scholar', 'fellowship', 5, true),
('2010–2011', 'HSBC-Chevening Scholarship', 'Foreign & Commonwealth Office, UK', 'fellowship', 6, true),
('2009', 'Goldman Sachs Global Leadership Award', 'Goldman Sachs', 'fellowship', 7, true),
('2020', 'Dean''s Commendation for Exceptional Volunteering', 'UCSF', 'fellowship', 8, true),
('2007–2010', 'Principal''s Prize: Maria Philip Award', 'Best All-Rounder Student, Mount Carmel College', 'fellowship', 9, true),
('2020', 'TEDx Speaker', '2020', 'recognition', 1, true),
(null, 'Global Perspectives Programme', 'Swiss Embassy, Washington D.C.', 'recognition', 2, true),
('2026 – Present', 'Founding Director, GENE-India Foundation', '2026 – Present', 'recognition', 3, true),
(null, 'Core Team Leader, Kashmir Care Foundation', null, 'recognition', 4, true),
(null, 'Advisory Council Member, Kashmir Care Foundation', null, 'recognition', 5, true),
(null, 'Lifetime Member, Indian Academy of Neurosciences', null, 'recognition', 6, true),
(null, 'Member, ISSCR', 'International Society for Stem Cell Research', 'recognition', 7, true),
(null, 'Member, Society for Neuroscience (SfN)', null, 'recognition', 8, true);
