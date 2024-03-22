import React from 'react';
import { Document, Page, Text, View, StyleSheet, Font } from '@react-pdf/renderer';
import OpenSansLight from '../../../../media/fonts/OpenSans-Light.ttf';
import OpenSansRegular from '../../../../media/fonts/OpenSans-Regular.ttf';
import OpenSansMedium from '../../../../media/fonts/OpenSans-Medium.ttf';
import OpenSansSemiBold from '../../../../media/fonts/OpenSans-SemiBold.ttf';
import OpenSansBold from '../../../../media/fonts/OpenSans-Bold.ttf';
import OpenSansExtraBold from '../../../../media/fonts/OpenSans-ExtraBold.ttf';

function PericulosidadeGenerate({ inventario, plano,
  company, unidades, setores, cargos, contatos,
  processos, riscos, user, aparelhos, data, }) {

  const find = (item, tipo) => {
    try {
      if (!item) {
        return 'N/A';
      }

      switch (tipo) {
        case 'nome_unidade':
          const unidadeEncontrada = unidades.find((c) => c.id_unidade === item);
          return unidadeEncontrada ? unidadeEncontrada.nome_unidade : 'N/A';

        case 'nome_setor':
          const setorEncontrado = setores.find((c) => c.id_setor === item);
          return setorEncontrado ? setorEncontrado.nome_setor : 'N/A';

        case 'nome_processo':
          const processoEncontrado = processos.find((c) => c.id_processo === item);
          return processoEncontrado ? processoEncontrado.nome_processo : 'N/A';

        case 'nome_aparelho':
          const aparelhosEncontrado = aparelhos.find((c) => c.id_aparelho === item);
          const aparelho = `${aparelhosEncontrado.nome_aparelho} - ${aparelhosEncontrado.marca_aparelho} (${formatData(aparelhosEncontrado.data_calibracao_aparelho)})`
          return aparelho;

        case 'nome_risco':
        case 'grupo_risco':
        case 'consequencia':
        case 'avaliacao':
        case 'limite_tolerancia':
        case 'metodologia':
        case 'severidade':
        case 'unidade_medida':
        case 'esocial':
          const riscoEncontrado = riscos.find((c) => c.id_risco === item);
          if (riscoEncontrado) {
            switch (tipo) {
              case 'nome_risco':
                return riscoEncontrado.nome_risco || "N/A";
              case 'grupo_risco':
                return riscoEncontrado.grupo_risco || "N/A";
              case 'consequencia':
                return riscoEncontrado.danos_saude_risco || "N/A";
              case 'avaliacao':
                return riscoEncontrado.classificacao_risco || "N/A";
              case 'limite_tolerancia':
                return riscoEncontrado.limite_tolerancia_risco || "0";
              case 'metodologia':
                return riscoEncontrado.metodologia_risco || "N/A";
              case 'severidade':
                return riscoEncontrado.severidade_risco || "N/A";
              case 'unidade_medida':
                return riscoEncontrado.unidade_medida_risco;
              case 'esocial':
                return riscoEncontrado.codigo_esocial_risco;
            }
          } else {
            return 'N/A';
          }
        default:
          return 'N/A';
      }
    } catch (error) {
      console.log("Erro ao buscar Dados!", error);
      return 'N/A';
    }
  };

  const formatData = (item) => {
    try {
      const data_formatada = new Date(item).toLocaleDateString('pr-BR');
      return data_formatada || 'N/A';
    } catch (error) {
      console.log("Erro ao formatar data!", error);
    }
  };

  const convertMedidas = (item) => {
    try {
      const medidasArray = JSON.parse(item);
      return medidasArray.map(({ nome, tipo }) => `${tipo}: ${nome}`).join('\n');
    } catch (error) {
      console.error("Erro ao converter medidas:", error);
      return 'N/A';
    }
  };

  const findSetor = (item) => {
    const findSetor = setores.find((i) => i.id_setor === item);
    return findSetor ? findSetor.nome_setor : "N/A";
  };

  const getTotalFuncMasc = () => {
    return cargos.reduce((total, cargo) => total + cargo.func_masc, 0);
  };

  const getTotalFuncFem = () => {
    return cargos.reduce((total, cargo) => total + cargo.func_fem, 0);
  };

  const getTotalFuncMenor = () => {
    return cargos.reduce((total, cargo) => total + cargo.func_menor, 0);
  };

  const getTotalFunc = () => {
    const funcMasc = cargos.reduce((total, cargo) => total + cargo.func_masc, 0);
    const funcFem = cargos.reduce((total, cargo) => total + cargo.func_fem, 0);
    const funcMenor = cargos.reduce((total, cargo) => total + cargo.func_menor, 0);

    return funcMasc + funcFem + funcMenor;
  };

  const setVigencia = (item) => {
    try {
      const dataCalculada = new Date(item);

      dataCalculada.setFullYear(dataCalculada.getFullYear() + 2);
      return formatData(dataCalculada);
    } catch (error) {
      console.log("Erro ao calcular data", error)
    }
  };

  Font.register({ family: 'OpenSansLight', src: OpenSansLight });
  Font.register({ family: 'OpenSansRegular', src: OpenSansRegular });
  Font.register({ family: 'OpenSansMedium', src: OpenSansMedium });
  Font.register({ family: 'OpenSansSemiBold', src: OpenSansSemiBold });
  Font.register({ family: 'OpenSansBold', src: OpenSansBold });
  Font.register({ family: 'OpenSansExtraBold', src: OpenSansExtraBold });


  const PageStyles = StyleSheet.create({
    pageCenter: {
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#FFFFFF',
      paddingHorizontal: 40,
      paddingVertical: 10,
      height: '100%',
    },

    Page: {
      flexDirection: 'column',
      backgroundColor: '#FFFFFF',
      paddingHorizontal: 40,
      paddingVertical: 10,
      height: '100%',
    },

    LandscapePage: {
      flexDirection: 'column',
      backgroundColor: '#FFFFFF',
      paddingHorizontal: 10,
      paddingVertical: 10,
      height: '100%',
    },

    coverPage: {
      backgroundColor: '#ad2831',
      padding: 10,
      color: '#fff',
    },
  });

  const TextStyles = StyleSheet.create({
    headerText: {
      fontSize: 14,
      textAlign: 'center',
      marginBottom: 5,
      paddingTop: 10,
      fontFamily: 'OpenSansBold',
    },

    topText: {
      fontSize: 16,
      textAlign: 'center',
      marginBottom: 20,
    },

    centerText: {
      fontSize: 24,
      textAlign: 'center',
      marginBottom: 20,
      fontFamily: 'OpenSansExtraBold',
    },

    SignatureDate: {
      fontSize: 10,
      textAlign: 'left',
      color: '#343a40',
      fontFamily: 'OpenSansLight',
    },

    officeText: {
      fontSize: 12,
      fontFamily: 'OpenSansRegular',
    },

    officeSmallText: {
      fontSize: 10,
      color: '#6c757d',
      fontFamily: 'OpenSansLight',
    },

    smallText: {
      fontSize: 12,
    },

    littleText: {
      fontSize: 10,
      textAlign: 'center',
      fontFamily: 'OpenSansRegular',
    },

    smallTextVigencia: {
      fontSize: 10,
    },

    subTitleSumary: {
      fontSize: 16,
      justifyContent: 'flex-start',
      alignItems: 'flex-start',
      fontFamily: 'OpenSansBold',
    },

    subSubTitleSumary: {
      fontSize: 12,
      justifyContent: 'flex-start',
      alignItems: 'flex-start',
      marginLeft: 10,
      marginTop: 10,
    },

    prefixText: {
      fontSize: 8,
      color: '#6c757d',
      marginRight: 5,
      fontFamily: 'OpenSansLight',
    },

    prefixTextTitle: {
      fontSize: 8,
      color: '#ced4da',
      marginRight: 5,
      fontFamily: 'OpenSansLight',
    },

    valueText: {
      fontSize: 10,
      fontFamily: 'OpenSansRegular',
    },

    valueTextTitle: {
      fontSize: 14,
      color: '#f8f9fa',
      fontFamily: 'OpenSansMedium',
    },

    valueTextSignatureTitle: {
      fontSize: 12,
      color: '#f8f9fa',
      fontFamily: 'OpenSansBold',
    },

    footerText: {
      fontSize: 10,
      textAlign: 'center',
      marginTop: 5,
      fontFamily: 'OpenSansBold',
    },

    footerAddresText: {
      fontSize: 10,
      textAlign: 'center',
      marginTop: 2,
      color: '#6c757d',
      fontFamily: 'OpenSansLight',
    },

    title: {
      fontSize: 12,
      fontFamily: 'OpenSansBold',
    },

    paragraph: {
      fontSize: 10,
      textAlign: 'justify',
      textTransform: 'none',
      marginBottom: 10,
      fontFamily: 'OpenSansRegular',
    },

    tableTitle: {
      fontFamily: 'OpenSansBold',
      fontSize: 10,
      color: '#ffffff',
      textAlign: 'center',
    },

    tableTitleSize8: {
      fontFamily: 'OpenSansBold',
      fontSize: 8,
      color: '#ffffff',
      textAlign: 'center',
    },

    contentTableText: {
      fontFamily: 'OpenSansRegular',
      fontSize: 8,
    },

    listItem: {
      marginBottom: 5,
      fontSize: 10,
      fontFamily: 'OpenSansLight',
    },

    listItemRoman: {
      marginBottom: 5,
      fontSize: 10,
      fontFamily: 'OpenSansBold',
    },
  });

  const ContainerStyles = StyleSheet.create({
    headerContainer: {
      width: '100%',
      borderBottom: '1 solid #e5e5e5',
      marginBottom: 20,
    },

    centerContainer: {
      marginTop: 'auto',
      width: '100%',
      flexDirection: 'row',
      justifyContent: 'center',
      paddingHorizontal: 20,
    },

    bottomContainer: {
      marginTop: 'auto',
      width: '100%',
      flexDirection: 'row',
      justifyContent: 'flex-end',
    },

    bottomContainerVigencia: {
      marginTop: 'auto',
      width: '100%',
      marginBottom: 10,
      flexDirection: 'row',
      justifyContent: 'flex-end',
    },

    signatureContainer: {
      width: '100%',
      marginTop: 50,
    },

    footerContainer: {
      marginTop: 'auto',
      width: '100%',
      borderTop: '1 solid #e5e5e5',
    },

    textContainer: {
      marginTop: 10,
      marginLeft: 10,
    },

    space10: {
      paddingTop: 10,
      paddingBottom: 10,
    },

    space: {
      paddingTop: 5,
      paddingBottom: 5,
    },

    spaceTop20: {
      paddingTop: 20,
    },

    list: {
      marginLeft: 10,
      marginBottom: 10,
    },

    listRoman: {
      marginRigth: 10,
    },
  });

  const TableStyles = StyleSheet.create({
    table: {
      marginTop: 10,
      width: '100%',
      marginBottom: 10,
    },

    headerCell: {
      padding: 5,
      backgroundColor: '#0077b6',
      width: '100%',
    },

    headerTable: {
      padding: 2,
      backgroundColor: '#0077b6',
      flexDirection: 'row',
    },

    headerCellTable: {
      width: '33%',
      justifyContent: 'center',
      alignItems: 'center',
    },

    tableRow: {
      borderBottom: '1 solid #343a40',
      flexDirection: 'row',
      width: '100%',
      alignItems: 'center',
    },

    seventyFiveRow: {
      paddingHorizontal: 10,
      paddingVertical: 5,
      width: '75%',
    },

    fiftyRow: {
      paddingHorizontal: 10,
      paddingVertical: 5,
      width: '50%',
    },

    fortyRow: {
      paddingHorizontal: 10,
      paddingVertical: 5,
      width: '40%',
    },

    twentyFiveRow: {
      paddingHorizontal: 10,
      paddingVertical: 5,
      width: '25%',
    },

    twentyRow: {
      paddingHorizontal: 10,
      paddingVertical: 5,
      width: '20%',
    },

    fifTeenRow: {
      paddingHorizontal: 10,
      paddingVertical: 5,
      width: '15%',
    },

    headerSignatureContentCell: {
      paddingHorizontal: 10,
      paddingVertical: 10,
      backgroundColor: '#0077b6',
      width: '100%',
      flexDirection: 'row',
    },

    headerSignatureCell: {
      width: '50%',
      justifyContent: 'center',
      alignItems: 'center',
    },

    signatureLine: {
      height: '20%',
      borderBottom: '1 solida #343a40'
    },

    officeFiftyRow: {
      paddingHorizontal: 10,
      paddingVertical: 20,
      width: '50%',
      alignItems: 'center',
      justifyContent: 'center',
    },

    contentTable: {
      flexDirection: 'row',
    },

    contentCell: {
      border: '0.3 solid #333333',
      height: '100%',
      justifyContent: 'center',
      paddingHorizontal: 5,
      paddingVertical: 2,
    },

    Column: {
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
      borderBottom: '1 solida #495057',
    },

    headerColumn: {
      flex: 1,
      width: '30%',
      backgroundColor: '#0077b6',
      color: '#ffffff',
      padding: 8,
      fontSize: 11,
      height: '100%',
      justifyContent: 'center',
      alignItems: 'center',
      fontFamily: 'OpenSansBold',
    },

    contentColumn: {
      width: '70%',
      flex: 2,
      padding: 5,
      fontSize: 8,
      textAlign: 'justify',
      justifyContent: 'center',
      fontFamily: 'OpenSansRegular',
    },

  });

  const HeaderPage = () => {
    return (
      <View style={ContainerStyles.headerContainer}>
        <Text style={TextStyles.headerText}>Laudo de Periculosidade</Text>
        <Text style={TextStyles.littleText}>Nome da Empresa - Versão</Text>
      </View>
    );
  }

  const FooterPage = () => {
    return (
      <View style={ContainerStyles.footerContainer}>
        <Text style={TextStyles.footerText}>Nome da Empresa</Text>
        <Text style={TextStyles.footerAddresText}>Rua Goias, 1914 - apto 301 - Londrina/PR 86020-410</Text>
      </View>
    );
  }

  const CoverPage = () => {
    return (
      <Page size="A4" style={PageStyles.Page}>
        <Text style={TextStyles.headerText}>Laudo de Periculosidade</Text>
        <View style={ContainerStyles.centerContainer}>
          <Text style={TextStyles.centerText}>{company.nome_empresa}</Text>
        </View>
        <View style={ContainerStyles.bottomContainerVigencia}>
          <Text style={TextStyles.smallTextVigencia}>Londrina, {formatData(data)} - Vigência: {setVigencia(formatData(data))}</Text>
        </View>
      </Page>
    )
  };

  const SumaryPage = () => {
    return (
      <Page size="A4" style={PageStyles.pageCenter}>
        <HeaderPage />
        <Text style={TextStyles.topText}>Sumário</Text>
        <FooterPage />
      </Page>
    );
  };

  const IntroductionPage = () => {
    return (
      <Page style={PageStyles.Page} wrap>

        <HeaderPage />

        <Text style={TextStyles.subTitleSumary}>2. Introdução</Text>

        <View style={ContainerStyles.textContainer} wrap={true}>
          <Text style={TextStyles.paragraph}>
            A primeira referência legal a laudo técnico foi na Lei nº 5.431 de 3 de maio de 1968, que acrescentou o § 5º no então artigo 209 da Consolidação das Leis do Trabalho - CLT, para fins de caracterização de insalubridade.
          </Text>
          <Text style={TextStyles.paragraph}>
            Para fins de instrução de processo judicial, a caracterização e classificação de insalubridade serão feitas exclusivamente por médico perito, preferencialmente especializado em saúde pública ou higiene industrial, designado pela autoridade judiciária, observadas as normas fixadas no presente artigo.
          </Text>
          <Text style={TextStyles.paragraph}>
            A Lei nº 6.514 de 22 de dezembro de 1977 modifica o Capítulo V da CLT - Da Segurança e da Medicina do Trabalho, prevendo no seu artigo 195, que:
          </Text>
          <Text style={TextStyles.paragraph}>
            A caracterização e a classificação da insalubridade e da periculosidade, segundo as normas do Ministério do Trabalho, far-se-ão através de perícia a cargo de Médico do Trabalho ou Engenheiro do Trabalho, registrados no Ministério do Trabalho. 21 A CLT antecede a Lei nº 8.213 de 1991 e regulamenta o laudo técnico para fins de caracterização de atividades e operações insalubres e/ou perigosas, passíveis de concessão dos adicionais previstos na Norma Regulamentadora (NR) 15 e na Norma Regulamentadora 16, da Portaria nº 3214 de 1978 do Ministério do Trabalho e Emprego (MTE).
          </Text>
          <Text style={TextStyles.paragraph}>
            O Laudo Técnico de Condições Ambientais do Trabalho - LTCAT, previsto na Lei nº 8.213 de 1991, tem finalidade previdenciária na concessão da aposentadoria especial.
          </Text>
          <Text style={TextStyles.paragraph}>
            Portanto, não se deve confundir a finalidade do laudo técnico de insalubridade e/ou periculosidade com o LTCAT para avaliação de caracterização de condições especiais previstas na aposentadoria especial. Os laudos técnicos acima referenciados são documentos elaborados a partir de um conjunto de procedimentos que tem por objetivo concluir, mediante exame, vistoria, indagação, investigação, avaliação, se existem condições insalubres e/ou perigosas ou se existe efetiva exposição a fatores de riscos nocivos, de acordo com a legislação pertinente. É importante o caráter técnico pericial comum a esses laudos.
          </Text>
          <Text style={TextStyles.paragraph}>
            Porém, alguns dos conceitos neles contidos são distintos. O laudo trabalhista versa sobre periculosidade, nas condições previstas na NR-16 da Portaria nº 3214 de 1978, e/ou insalubridade quando as atividades se desenvolverem acima dos limites de tolerância para os fatores de riscos previstos nos Anexos I, II, III, V, XI e XII; nas atividades mencionadas nos Anexos VI, XIII e XIV; e comprovadas através de laudo de inspeção do local de trabalho, constantes dos Anexos VII, VIII, IX e X da NR-15.
          </Text>
          <Text style={TextStyles.paragraph}>
            O laudo para fins previdenciários depende de duas definições básicas: a nocividade e a permanência. A nocividade é relativa aos fatores de riscos físicos, químicos, biológicos ou associação de fatores de riscos capazes de causar danos à saúde ou à integridade física do trabalhador, previstos nos diversos anexos dos decretos previdenciários.
          </Text>
          <Text style={TextStyles.paragraph}>
            A permanência diz respeito à necessidade, para caracterização de condições especiais, de que o trabalho exposto aos fatores de riscos nocivos ocorra de modo permanente, não ocasional nem intermitente, indissociável da produção do bem ou da prestação do serviço.
          </Text>
          <Text style={TextStyles.paragraph}>
            No entanto, a primeira legislação sobre aposentadoria especial, a Lei nº 3.807 de 1960, normatiza a concessão do benefício para o “segurado que exerça ou tenha exercido atividade profissional em serviços considerados insalubres, perigosos ou penosos”. O Laudo Técnico de Condições Ambientais do Trabalho - LTCAT está previsto na legislação brasileira a partir da Medida Provisória nº 1.523 de 1996, que se transformou na Lei nº 9.528 de 1997 e modificou a Lei nº 8.213 de 1991 que trata dos Planos de Benefícios da Previdência Social, no seu Artigo 58, acrescentando que a:
          </Text>
        </View>
        <FooterPage />

      </Page>
    );
  };

  const IntroductionPageContinue = () => {
    return (
      <Page style={PageStyles.Page} wrap>

        <HeaderPage />

        <View style={ContainerStyles.textContainer} wrap={true}>
          <Text style={TextStyles.paragraph}>
            Comprovação da efetiva exposição do segurado aos fatores de riscos nocivos será feita mediante formulário, na forma estabelecida pelo Instituto Nacional do Seguro Social - INSS, emitido pela empresa ou seu preposto, com base em laudo técnico de condições ambientais do trabalho expedido por médico do trabalho ou engenheiro de segurança do trabalho.
          </Text>
          <Text style={TextStyles.paragraph}>
            O Decreto nº 3.048 de 1999, no Parágrafo 2º do seu Art. 68, também determina que a comprovação da efetiva exposição do segurado aos fatores de riscos nocivos será feita mediante formulário denominado perfil profissiográfico previdenciário, na forma 23 estabelecida pelo Instituto Nacional do Seguro Social, emitido pela empresa ou seu preposto, com base em laudo técnico de condições ambientais do trabalho expedido por médico do trabalho ou engenheiro de segurança do trabalho. Outros documentos previstos nas Normas Regulamentadoras da Portaria nº 3.214 de 1978 do MTE podem ser utilizados como substitutos do LTCAT, como o Programa de Controle Médico de Saúde Ocupacional - PCMSO, o Programa de Prevenção de Riscos Ambientais - PPRA, o Programa de Condições do Meio Ambiente de Trabalho - PCMAT e o Programa de Gerenciamento de Riscos - PGR, desde que assinados por engenheiro de segurança ou médico do trabalho.
          </Text>
          <Text style={TextStyles.paragraph}>
            Desse modo, há que se observar que, a própria evolução histórica da legislação resultou em diferenciação temporal entre a intervenção indenizatória antecipada dos adicionais e a intervenção propositiva futura da aposentadoria especial.
          </Text>
          <Text style={TextStyles.paragraph}>
            E apesar de conclusões diferentes, ambas as políticas têm finalidade prevencionista no momento em que penalizam a má gestão em saúde, segurança e ambiente de trabalho prejudicial à saúde do trabalhador, com a obrigatoriedade do pagamento dos adicionais trabalhistas ou dos recolhimentos previdenciários custeadores da aposentadoria especial. Estrutura do LTCAT Fundamentação legal: Lei nº 8.213/1991 com alterações posteriores e Decreto nº 3.048/1999 com alterações posteriores.
          </Text>
          <Text style={TextStyles.paragraph}>
            O LTCAT e demais Demonstrações Ambientais fundamentarão tecnicamente o preenchimento dos formulários de reconhecimento de períodos laborados em condições especiais - PPP e seus precursores (§ 1º do artigo 58 da Lei nº 8.213/1991 e §2º e §7º do artigo 68 do Decreto nº 3.048/1999).
          </Text>
          {/* List */}
          <Text style={TextStyles.paragraph}>São consideradas Demonstrações Ambientais:</Text>
          <View style={ContainerStyles.list}>
            <Text style={TextStyles.listItem}>{'\u2022'} Programa de Prevenção de Riscos Ambientais - PPRA (NR-9 do MTE - Portaria nº 3.214/1978);</Text>
            <Text style={TextStyles.listItem}>{'\u2022'} Programa de Gerenciamento de Riscos - PGR (NR-22 do MTE - Portaria nº 3.214/1978);</Text>
            <Text style={TextStyles.listItem}>{'\u2022'} Programa de Condições e Meio Ambiente de Trabalho na Indústria da Construção - PCMAT (NR-18 do MTE - Portaria nº 3.214/1978);</Text>
            <Text style={TextStyles.listItem}>{'\u2022'} Programa de Controle Médico de Saúde Ocupacional - PCMSO; (NR-7 do MTE - Portaria nº 3.214/1978); </Text>
          </View>
          <Text style={TextStyles.paragraph}>
            Laudo Técnico de Condições Ambientais do Trabalho - LTCAT; Art. 58 da Lei nº 8.213/1991, Art. 68 do Decreto nº 3.048/1999. O LTCAT e as demais Demonstrações Ambientais deverão considerar:
          </Text>
          {/* List */}
          <View style={ContainerStyles.list}>
            <Text style={TextStyles.listItem}>{'\u2022'} A efetiva exposição aos fatores de riscos nocivos químicos, físicos, biológicos ou associação de fatores de riscos prejudiciais à saúde ou à integridade física;</Text>
            <Text style={TextStyles.listItem}>{'\u2022'} As condições especiais que prejudicam a saúde ou integridade física conforme definido no Anexo IV do Decreto nº 3.048/1999, com exposição a fatores de riscos nocivos em concentração ou intensidade e tempo de exposição que ultrapasse os limites de tolerância ou que, dependendo do fator de risco, torne a simples exposição em condição especial prejudicial à saúde; </Text>
            <Text style={TextStyles.listItem}>{'\u2022'} O conceito de nocividade como situação combinada ou não de substâncias, energias e demais fatores de riscos reconhecidos, presentes no ambiente de trabalho, capazes de trazer ou ocasionar danos à saúde ou à integridade física do trabalhador; </Text>
          </View>
        </View>
        <FooterPage />

      </Page>
    );
  };

  const IntroductionPageContinueTwo = () => {
    return (
      <Page style={PageStyles.Page} wrap>

        <HeaderPage />

        <View style={ContainerStyles.textContainer} wrap={true}>

          {/* List */}
          <View style={ContainerStyles.list}>
            <Text style={TextStyles.listItem}>{'\u2022'} O conceito de permanência como aquele em que a exposição ao fator de risco nocivo ocorre de forma não ocasional nem intermitente, no qual a exposição do empregado, do trabalhador avulso ou do cooperado ao fator de risco nocivo seja indissociável da produção do bem ou da prestação do serviço;</Text>
            <Text style={TextStyles.listItem}>{'\u2022'} A avaliação dos fatores de riscos nocivos, conforme o caso, pode ser de modo qualitativo, quando a nocividade ocorre pela simples presença do fator de risco no ambiente de trabalho, descrito no Anexo IV do Decreto nº 3.048/1999 e corroborado nos Anexos VI, XIII, XIII-A e XIV da NR-15 do MTE; ou quantitativo, no qual a nocividade acontece pela ultrapassagem dos limites de tolerância ou doses previstos, no Anexo IV do Decreto nº 3.048/1999 e nos Anexos I, II, III, IV, VIII, XI e XII da NR-15 do MTE;</Text>
          </View>
          <Text style={TextStyles.paragraph}>
            A partir de 19.11.2003 (data da publicação no D.O.U. do Decreto nº 4.882/2003) os procedimentos de levantamento ambiental devem estar de acordo com a metodologia das Normas de Higiene Ocupacional - NHO da FUNDACENTRO, observando-se os limites de tolerância estabelecidos na NR-15 do MTE.
          </Text>
          <Text style={TextStyles.paragraph}>
            O LTCAT e as demais Demonstrações Ambientais deverão conter as seguintes informações:
          </Text>
          <View style={ContainerStyles.list}>
            <Text style={TextStyles.listItem}><Text style={TextStyles.listItemRoman}>I. </Text> Identificação da empresa, cooperativa de trabalho ou de produção, OGMO (trabalhador avulso portuário), sindicato da categoria (trabalhador avulso não portuário);</Text>
            <Text style={TextStyles.listItem}><Text style={TextStyles.listItemRoman}>II. </Text> Se individual ou coletivo;</Text>
            <Text style={TextStyles.listItem}><Text style={TextStyles.listItemRoman}>III. </Text> Identificação do setor e da função;</Text>
            <Text style={TextStyles.listItem}><Text style={TextStyles.listItemRoman}>IV. </Text> Descrição da atividade (profissiografia); </Text>
            <Text style={TextStyles.listItem}><Text style={TextStyles.listItemRoman}>V. </Text> Descrição dos fatores de riscos nocivos capazes de causar danos à saúde e integridade física, arrolados na legislação previdenciária;</Text>
            <Text style={TextStyles.listItem}><Text style={TextStyles.listItemRoman}>VI. </Text> Localização das possíveis fontes geradoras;</Text>
            <Text style={TextStyles.listItem}><Text style={TextStyles.listItemRoman}>VII. </Text> Via e periodicidade de exposição ao fator de risco nocivo;</Text>
            <Text style={TextStyles.listItem}><Text style={TextStyles.listItemRoman}>VIII. </Text> Metodologia e procedimentos de avaliação do fator de risco nocivo;</Text>
            <Text style={TextStyles.listItem}><Text style={TextStyles.listItemRoman}>IX. </Text> Descrição das tecnologias de proteção coletiva e individual, assim como medidas administrativas; </Text>
            <Text style={TextStyles.listItem}><Text style={TextStyles.listItemRoman}>X. </Text> Conclusão;</Text>
            <Text style={TextStyles.listItem}><Text style={TextStyles.listItemRoman}>XI. </Text> Assinatura e identificação do médico do trabalho ou engenheiro de segurançaresponsável técnico pelo laudo ou demonstrações ambientais, anexando fotocópia da carteira profissional com inscrição no CRM ou CREA, comprovante de especialização e informação do número da Anotação de Responsabilidade Técnica - ART junto ao CREA; </Text>
            <Text style={TextStyles.listItem}><Text style={TextStyles.listItemRoman}>XII. </Text> Data da realização da demonstração ambiental ou do laudo. O LTCAT ou demais Demonstrações Ambientais serão exigidos conforme os seguintes períodos:</Text>
            <View style={ContainerStyles.list}>
              <Text style={TextStyles.listItem}>{'\u2022'} Até 28.4.1995, exclusivamente para o Fator de Risco físico ruído, e unicamente o LTCAT;</Text>
              <Text style={TextStyles.listItem}>{'\u2022'} De 29.4.1995 até 13.10.1996 apenas para o fator de risco físico ruído, todavia podendo ser aceitos o LTCAT ou demais demonstrações ambientais;</Text>
              <Text style={TextStyles.listItem}>{'\u2022'} De 14.10.1996 a 17.11.2003, LTCAT ou demais demonstrações, para todos os fatores de riscos nocivos e avaliando de acordo com a metodologia e limite de tolerância da NR-15, da Portaria nº 3.214/1978, do MTE; </Text>
              <Text style={TextStyles.listItem}>{'\u2022'} De 18.11.2003 a 31.12.2003, LTCAT ou demais demonstrações, para todos os fatores de riscos nocivos e avaliando de acordo com a metodologia das NHO da FUNDACENTRO, embora os limites de tolerância continuem os da NR 15, da Portaria nº 3.214/1978, do MTE; A partir de 1.1.2004, quando inicia a vigência do PPP, não é exigida a apresentação do LTCAT ou demais demonstrações ambientais, podendo ser solicitados pelo perito médico, se necessário.</Text>
            </View>
          </View>
        </View>
        <FooterPage />

      </Page>
    );
  };

  const ObjectivePage = () => {
    return (
      <Page style={PageStyles.Page} wrap>

        <HeaderPage />

        <Text style={TextStyles.subTitleSumary}> 2. Objetivo</Text>

        <View style={ContainerStyles.textContainer} wrap={true}>
          <Text style={TextStyles.paragraph}>
            Laudo coletivo de todos os cargos existentes na empresa, elaborado por determinação do empregador, atendendo o item II da referida solicitação de obrigatoriedade de informações.
          </Text>
        </View>

        <View style={ContainerStyles.space}></View>

        <Text style={TextStyles.subTitleSumary}> 3. Metodologia de Reconhecimento</Text>

        <View style={ContainerStyles.textContainer} wrap={true}>
          <Text style={TextStyles.title}>Reconhecimento dos Riscos</Text>
          <View style={ContainerStyles.spaceTop20}></View>
          <Text style={TextStyles.paragraph}>
            Os fatores de riscos serão levantados obedecendo a seguinte metodologia:
          </Text>
          <View style={ContainerStyles.list}>
            <Text style={TextStyles.listItem}>{'\u2022'} A sua identificação;</Text>
            <Text style={TextStyles.listItem}>{'\u2022'} A determinação e localização das possíveis fontes geradoras;</Text>
            <Text style={TextStyles.listItem}>{'\u2022'} A identificação das possíveis trajetórias e dos meios de propagação dos fatores de riscos no ambiente de trabalho; </Text>
            <Text style={TextStyles.listItem}>{'\u2022'} A identificação das funções e determinação do número de trabalhadores expostos;</Text>
            <Text style={TextStyles.listItem}>{'\u2022'} A caracterização das atividades e do tipo da exposição;</Text>
            <Text style={TextStyles.listItem}>{'\u2022'} A obtenção de dados existentes na empresa, indicativos de possível comprometimento da saúde decorrente do trabalho;</Text>
            <Text style={TextStyles.listItem}>{'\u2022'} Os possíveis danos à saúde relacionados aos riscos identificados, disponíveis na literatura técnica;</Text>
            <Text style={TextStyles.listItem}>{'\u2022'} A descrição das medidas de controle já existentes e informação sobre a existência de tecnologia de proteção coletiva ou individual que diminua a intensidade do fator de risco agressivo a limites de tolerância e recomendação sobre a adoção, se for o caso.</Text>
          </View>
          <View style={ContainerStyles.spaceTop20}></View>

          <Text style={TextStyles.title}>Metodologia</Text>
          <View style={ContainerStyles.space}></View>
          <View style={ContainerStyles.list}>
            <Text style={TextStyles.listItem}>{'\u2022'} Visita no local de trabalho;</Text>
            <Text style={TextStyles.listItem}>{'\u2022'} Análise da finalidade e/ou produtos fabricados no setor; </Text>
            <Text style={TextStyles.listItem}>{'\u2022'} Entrevista com o encarregado do setor levantando informações relativas ao processo de trabalho e queixa de trabalhadores, situações de risco.</Text>
          </View>
          <View style={ContainerStyles.spaceTop20}></View>

          <Text style={TextStyles.title}>Inspeções</Text>
          <View style={ContainerStyles.space}></View>
          <View style={ContainerStyles.list}>
            <Text style={TextStyles.listItem}><Text style={TextStyles.listItemRoman}>A. Documentos;</Text></Text>
            <View style={ContainerStyles.list}>
              <Text style={TextStyles.listItem}>{'\u2022'} Análise do tipo de maquinário, manuais e legislação pertinente;</Text>
              <Text style={TextStyles.listItem}>{'\u2022'} Quando identificado riscos químicos, análise da FISPQ - Ficha de Informação de Segurança de Produtos Químicos</Text>
              <Text style={TextStyles.listItem}>{'\u2022'} Registro de acidentes e/ou incidentes nos últimos 5 anos. Caso a empresa não possua registros será realizada pesquisas sobre o ramo de atividade e índices de acidentes para determinação das prioridades;</Text>
              <Text style={TextStyles.listItem}>{'\u2022'} Registro de doenças do trabalho conforme relatório anual do PCMSO;</Text>
              <Text style={TextStyles.listItem}>{'\u2022'} Medidas existentes documentadas.</Text>
            </View>
          </View>
        </View>
        <FooterPage />

      </Page >
    );
  };

  const ObjectivePageContinue = () => {
    return (
      <Page style={PageStyles.Page} wrap>

        <HeaderPage />

        <View style={ContainerStyles.textContainer} wrap={true}>
          <View style={ContainerStyles.list}>
            <Text style={TextStyles.listItem}><Text style={TextStyles.listItemRoman}>B. Avaliação de Campo;</Text></Text>
            <View style={ContainerStyles.list}>
              <Text style={TextStyles.listItem}>{'\u2022'} Acompanhamento dos processos de trabalho;</Text>
              <Text style={TextStyles.listItem}>{'\u2022'} Identificação dos riscos químicos, físicos e biológicos. Apenas os riscos de acidentes com energia elétrica contemplarão o documento.</Text>
              <Text style={TextStyles.listItem}>{'\u2022'} Identificado fatores de riscos químicos o avaliador de campo deverá obter as seguintes informações: forma física do fator de risco, quantidades empregadas no processo, frequência e média de utilização;</Text>
              <Text style={TextStyles.listItem}>{'\u2022'} Determinação e localização das fontes geradoras;</Text>
              <Text style={TextStyles.listItem}>{'\u2022'} Definição dos cargos e funções dos trabalhadores expostos;</Text>
              <Text style={TextStyles.listItem}>{'\u2022'} Tipo de exposição ao risco;</Text>
            </View>

            <View style={ContainerStyles.spaceTop20}></View>

            <Text style={TextStyles.title}>Riscos Ocupacionais</Text>
            <View style={ContainerStyles.space}></View>
            <View style={TableStyles.table}>
              <View style={TableStyles.Column}>
                <View style={TableStyles.headerColumn}>
                  <Text>Físicos</Text>
                </View>
                <View style={TableStyles.contentColumn}>
                  <Text>Ruído, vibrações, pressões anormais, temperaturas extremas, radiações ionizantes, radiações não ionizantes, eletricidade, bem como o infrassom e o ultrassom.</Text>
                </View>
              </View>

              <View style={TableStyles.Column}>
                <View style={TableStyles.headerColumn}>
                  <Text>Químicos</Text>
                </View>
                <View style={TableStyles.contentColumn}>
                  <Text>Substâncias, compostos ou produtos que possam penetrar no organismo pela via respiratória, nas formas de poeiras, fumos, névoas, neblinas, gases ou vapores, ou que, pela natureza da atividade de exposição, possam ter contato ou ser absorvidos pelo organismo através da pele ou por ingestão.</Text>
                </View>
              </View>

              <View style={TableStyles.Column}>
                <View style={TableStyles.headerColumn}>
                  <Text>Biológicos</Text>
                </View>
                <View style={TableStyles.contentColumn}>
                  <Text>Bactérias, fungos, bacilos, parasitas, protozoários, vírus, entre outros.</Text>
                </View>
              </View>
            </View>

            <View style={ContainerStyles.spaceTop20}></View>

            <Text style={TextStyles.title}>Tabela de Códigos de Ocorrência</Text>

            <View style={[TableStyles.table, { paddingTop: 5, paddingHorizontal: 40, }]}>
              <View style={TableStyles.headerTable}>
                <View style={[TableStyles.headerCell, { width: '30%' }]}>
                  <Text style={TextStyles.tableTitleSize8}>QTD de Vínculos</Text>
                </View>
                <View style={[TableStyles.headerCell, { width: '30%' }]}>
                  <Text style={TextStyles.tableTitleSize8}>Código</Text>
                </View>
                <View style={[TableStyles.headerCell, { width: '40%' }]}>
                  <Text style={TextStyles.tableTitleSize8}>Exposição a Fatores de Riscos Nocivos</Text>
                </View>
              </View>
              {/* 01 */}
              <View style={TableStyles.contentTable}>
                <View style={[TableStyles.contentCell, { width: '30%', textAlign: 'center', }]}>
                  <Text style={TextStyles.contentTableText}>Um</Text>
                </View>
                <View style={[TableStyles.contentCell, { width: '30%', textAlign: 'center', }]}>
                  <Text style={TextStyles.contentTableText}>Um ou ' '</Text>
                </View>
                <View style={[TableStyles.contentCell, { width: '40%' }]}>
                  <Text style={TextStyles.contentTableText}>Sem Exposição</Text>
                </View>
              </View>
              {/* 02 */}
              <View style={TableStyles.contentTable}>
                <View style={[TableStyles.contentCell, { width: '30%', textAlign: 'center', }]}>
                  <Text style={TextStyles.contentTableText}>Um</Text>
                </View>
                <View style={[TableStyles.contentCell, { width: '30%', textAlign: 'center', }]}>
                  <Text style={TextStyles.contentTableText}>2</Text>
                </View>
                <View style={[TableStyles.contentCell, { width: '40%' }]}>
                  <Text style={TextStyles.contentTableText}>Aposentadoria Especial 15 Anos</Text>
                </View>
              </View>
              {/* 03 */}
              <View style={TableStyles.contentTable}>
                <View style={[TableStyles.contentCell, { width: '30%', textAlign: 'center', }]}>
                  <Text style={TextStyles.contentTableText}>Um</Text>
                </View>
                <View style={[TableStyles.contentCell, { width: '30%', textAlign: 'center', }]}>
                  <Text style={TextStyles.contentTableText}>3</Text>
                </View>
                <View style={[TableStyles.contentCell, { width: '40%' }]}>
                  <Text style={TextStyles.contentTableText}>Aposentadoria Especial 20 Anos</Text>
                </View>
              </View>
              {/* 04 */}
              <View style={TableStyles.contentTable}>
                <View style={[TableStyles.contentCell, { width: '30%', textAlign: 'center', }]}>
                  <Text style={TextStyles.contentTableText}>Um</Text>
                </View>
                <View style={[TableStyles.contentCell, { width: '30%', textAlign: 'center', }]}>
                  <Text style={TextStyles.contentTableText}>4</Text>
                </View>
                <View style={[TableStyles.contentCell, { width: '40%' }]}>
                  <Text style={TextStyles.contentTableText}>Aposentadoria Especial 25 Anos</Text>
                </View>
              </View>
              {/* Múltipos 05 */}
              <View style={TableStyles.contentTable}>
                <View style={[TableStyles.contentCell, { width: '30%', textAlign: 'center', }]}>
                  <Text style={TextStyles.contentTableText}>Múltiplos</Text>
                </View>
                <View style={[TableStyles.contentCell, { width: '30%', textAlign: 'center', }]}>
                  <Text style={TextStyles.contentTableText}>5</Text>
                </View>
                <View style={[TableStyles.contentCell, { width: '40%' }]}>
                  <Text style={TextStyles.contentTableText}>Sem Exposição</Text>
                </View>
              </View>
              {/* Múltiplos 6 */}
              <View style={TableStyles.contentTable}>
                <View style={[TableStyles.contentCell, { width: '30%', textAlign: 'center', }]}>
                  <Text style={TextStyles.contentTableText}>Múltiplos</Text>
                </View>
                <View style={[TableStyles.contentCell, { width: '30%', textAlign: 'center', }]}>
                  <Text style={TextStyles.contentTableText}>6</Text>
                </View>
                <View style={[TableStyles.contentCell, { width: '40%' }]}>
                  <Text style={TextStyles.contentTableText}>Aposentadoria Especial 15 Anos</Text>
                </View>
              </View>
              {/* Múltiplos 7 */}
              <View style={TableStyles.contentTable}>
                <View style={[TableStyles.contentCell, { width: '30%', textAlign: 'center', }]}>
                  <Text style={TextStyles.contentTableText}>Múltiplis</Text>
                </View>
                <View style={[TableStyles.contentCell, { width: '30%', textAlign: 'center', }]}>
                  <Text style={TextStyles.contentTableText}>7'</Text>
                </View>
                <View style={[TableStyles.contentCell, { width: '40%' }]}>
                  <Text style={TextStyles.contentTableText}>Aposentadoria Especial 20 Anos</Text>
                </View>
              </View>
              {/* Múltilplos 8 */}
              <View style={TableStyles.contentTable}>
                <View style={[TableStyles.contentCell, { width: '30%', textAlign: 'center', }]}>
                  <Text style={TextStyles.contentTableText}>Múltiplos</Text>
                </View>
                <View style={[TableStyles.contentCell, { width: '30%', textAlign: 'center', }]}>
                  <Text style={TextStyles.contentTableText}>8</Text>
                </View>
                <View style={[TableStyles.contentCell, { width: '40%' }]}>
                  <Text style={TextStyles.contentTableText}>SAposentadoria Especial 25 Anos</Text>
                </View>
              </View>
            </View>
            <View style={ContainerStyles.space}></View>
            <Text style={TextStyles.paragraph}><Text style={{ fontFamily: 'OpenSansSemiBold', fontSize: 10, }}>Nota: </Text>Embora o Manual da GFIP oriente que o código “em branco” seja utilizado para o segurado sem exposição a fatores de riscos nocivos, que nunca esteve exposto, e o código “01” para o segurado que já esteve exposto a fatores de riscos nocivos e não está mais, não há diferença para o cálculo do valor devido à Previdência Social, pois em nenhum dos casos há cálculo do adicional do RAT.</Text>

          </View>
        </View>


        <FooterPage />

      </Page >
    );
  };

  const CompanyPage = () => {

    return (
      <Page style={PageStyles.Page}>

        {/* Cabeçalho */}
        <HeaderPage />

        {/* Sumário */}
        <Text style={TextStyles.subTitleSumary}>1. Identificação da Empresa</Text>

        {/* Company Table */}
        <View style={TableStyles.table}>
          <View style={TableStyles.headerCell}>
            <Text style={TextStyles.prefixTextTitle}>Empresa: </Text>
            <Text style={TextStyles.valueTextTitle}>{company.nome_empresa || "N/A"}</Text>
          </View>
          <View style={TableStyles.tableRow}>
            <View style={TableStyles.twentyFiveRow}>
              <Text style={TextStyles.prefixText}>CNPJ:</Text>
              <Text style={TextStyles.valueText}>{company.cnpj_empresa || "N/A"}</Text>
            </View>
            <View style={TableStyles.fifTeenRow}>
              <Text style={TextStyles.prefixText}>Cnae:</Text>
              <Text style={TextStyles.valueText}>{company.cnae_empresa || "0"}</Text>
            </View>
            <View style={TableStyles.fifTeenRow}>
              <Text style={TextStyles.prefixText}>Grau de Risco:</Text>
              <Text style={TextStyles.valueText}>{company.grau_risco_cnae || "0"}</Text>
            </View>
            <View style={TableStyles.fiftyRow}>
              <Text style={TextStyles.prefixText}>Descrição CNAE:</Text>
              <Text style={TextStyles.valueText}>Serviços de manutenção e reparação mecânica de veículos automotores</Text>
            </View>
          </View>
        </View>

        {/* Signature Table */}
        <View style={ContainerStyles.signatureContainer}>
          <Text style={TextStyles.SignatureDate}>Londrina, {formatData(data)}</Text>

          {/* Assinatura do Técnico */}
          <View style={TableStyles.table}>
            <View style={TableStyles.headerSignatureContentCell}>
              <View style={TableStyles.headerSignatureCell}>
                <Text style={TextStyles.valueTextSignatureTitle}>Elaborador</Text>
              </View>
              <View style={TableStyles.headerSignatureCell}>
                <Text style={TextStyles.valueTextSignatureTitle}>Assinatura</Text>
              </View>
            </View>
            <View style={TableStyles.tableRow}>
              <View style={TableStyles.officeFiftyRow}>
                <Text style={TextStyles.officeText}>{user.nome_usuario}</Text>
              </View>
              <View style={TableStyles.fiftyRow}>
                <View style={TableStyles.signatureLine}></View>
              </View>
            </View>
          </View>

          {/* Signature Table */}
          <View style={TableStyles.table}>
            <View style={TableStyles.headerSignatureContentCell}>
              <View style={TableStyles.headerSignatureCell}>
                <Text style={TextStyles.valueTextSignatureTitle}>Responsável</Text>
              </View>
              <View style={TableStyles.headerSignatureCell}>
                <Text style={TextStyles.valueTextSignatureTitle}>Assinatura</Text>
              </View>
            </View>
            <View style={TableStyles.tableRow}>
              <View style={TableStyles.officeFiftyRow}>
                <Text style={TextStyles.officeText}>{contatos.nome_contato}</Text>
                <Text style={TextStyles.officeSmallText}>{contatos.email_contato}</Text>
              </View>
              <View style={TableStyles.fiftyRow}>
                <View style={TableStyles.signatureLine}></View>
              </View>
            </View>
          </View>

        </View>

        {/* Footer */}
        <FooterPage />

      </Page>
    );
  };

  const UnidadesPage = () => {

    return (
      <Page style={PageStyles.Page}>

        <HeaderPage />

        <Text style={TextStyles.subTitleSumary}>16. Unidades da empresa</Text>

        {/* Unidades */}
        {unidades.map((item, i) => (
          <View key={i} style={TableStyles.table}>
            <View style={TableStyles.headerCell}>
              <Text style={TextStyles.prefixTextTitle}>Unidade: </Text>
              <Text style={TextStyles.valueTextTitle}>{item.nome_unidade}</Text>
            </View>
            <View style={TableStyles.tableRow}>
              <View style={TableStyles.twentyFiveRow}>
                <Text style={TextStyles.prefixText}>CNPJ:</Text>
                <Text style={TextStyles.valueText}>{item.cnpj_unidade || "N/A"}</Text>
              </View>
              <View style={TableStyles.twentyFiveRow}>
                <Text style={TextStyles.prefixText}>Cep:</Text>
                <Text style={TextStyles.valueText}>{item.cep_unidade}</Text>
              </View>
              <View style={TableStyles.fiftyRow}>
                <Text style={TextStyles.prefixText}>Endereço:</Text>
                <Text style={TextStyles.valueText}>{item.endereco_unidade}, {item.numero_unidade} - {item.complemento}</Text>
                <Text style={TextStyles.valueText}>{item.bairro_unidade} - {item.cidade_unidade}/{item.uf_unidade}</Text>
              </View>
            </View>
          </View>
        ))}

        <FooterPage />
      </Page>
    );
  };

  const PostPage = () => {
    return (
      <Page style={PageStyles.Page}>
        <HeaderPage />
        <Text style={TextStyles.subTitleSumary}>17. Caracterização das Atividades e Cargos</Text>

        {/* Tabela de Cargos */}
        <View style={TableStyles.table}>
          <View style={TableStyles.headerTable}>
            <View style={[TableStyles.headerCell, { width: ' 20%' }]}>
              <Text style={TextStyles.tableTitle}>Setor</Text>
            </View>
            <View style={[TableStyles.headerCell, { width: ' 20%' }]}>
              <Text style={TextStyles.tableTitle}>Cargo</Text>
            </View>
            <View style={[TableStyles.headerCell, { width: ' 40%' }]}>
              <Text style={TextStyles.tableTitle}>Descrição</Text>
            </View>
            <View style={[TableStyles.headerCell, { width: ' 20%' }]}>
              <Text style={TextStyles.tableTitle}>Funcionários</Text>
            </View>
          </View>
          {cargos.map((item, i) => (
            <View key={i} style={TableStyles.contentTable}>
              <View style={[TableStyles.contentCell, { width: '20%' }]}>
                <Text style={TextStyles.contentTableText}>{findSetor(item.fk_setor_id)}</Text>
              </View>
              <View style={[TableStyles.contentCell, { width: '20%' }]}>
                <Text style={TextStyles.contentTableText}>{item.nome_cargo}</Text>
              </View>
              <View style={[TableStyles.contentCell, { width: '40%' }]}>
                <Text style={TextStyles.contentTableText}>{item.descricao}</Text>
              </View>
              <View style={[TableStyles.contentCell, { width: '20%', alignItems: 'center', }]}>
                <Text style={TextStyles.contentTableText}>Masc: {item.func_masc}</Text>
                <Text style={TextStyles.contentTableText}>Fem: {item.func_fem}</Text>
                <Text style={TextStyles.contentTableText}>Menor: {item.func_menor}</Text>
              </View>
            </View>
          ))}
        </View>

        <View style={ContainerStyles.space10}></View>
        <Text style={TableStyles.title}>Total de Funcionários</Text>

        {/* Tabela de Funcionários */}
        <View style={TableStyles.table}>
          <View style={TableStyles.headerTable}>
            <View style={[TableStyles.headerCell, { width: ' 25%' }]}>
              <Text style={TextStyles.tableTitle}>Masculino</Text>
            </View>
            <View style={[TableStyles.headerCell, { width: ' 25%' }]}>
              <Text style={TextStyles.tableTitle}>Feminino</Text>
            </View>
            <View style={[TableStyles.headerCell, { width: ' 25%' }]}>
              <Text style={TextStyles.tableTitle}>Menor</Text>
            </View>
            <View style={[TableStyles.headerCell, { width: ' 25%' }]}>
              <Text style={TextStyles.tableTitle}>Total</Text>
            </View>
          </View>
          <View style={TableStyles.contentTable}>
            <View style={[TableStyles.contentCell, { width: '25%', alignItems: 'center', }]}>
              <Text style={TextStyles.contentTableText}>{getTotalFuncMasc()}</Text>
            </View>
            <View style={[TableStyles.contentCell, { width: '25%', alignItems: 'center', }]}>
              <Text style={TextStyles.contentTableText}>{getTotalFuncFem()}</Text>
            </View>
            <View style={[TableStyles.contentCell, { width: '25%', alignItems: 'center', }]}>
              <Text style={TextStyles.contentTableText}>{getTotalFuncMenor()}</Text>
            </View>
            <View style={[TableStyles.contentCell, { width: '25%', alignItems: 'center', }]}>
              <Text style={TextStyles.contentTableText}>{getTotalFunc()}</Text>
            </View>
          </View>
        </View>

        <FooterPage />
      </Page>
    );
  }

  const RiskInventoryPage = () => {

    const RiskInventoryStyles = StyleSheet.create({
      contentText: {
        fontFamily: 'OpenSansRegular',
        fontSize: 6,
        wordWrap: 'break-word',
        overflow: 'hidden',
        whiteSpace: 'pre',
      },
    });

    return (
      <Page size="A4" orientation='landscape' wrap style={PageStyles.LandscapePage}>

        {/* Cabeçalho */}
        <HeaderPage />

        {/* Sumário */}
        <Text style={TextStyles.subTitleSumary}>18. Inventário de Riscos</Text>

        {/* Tabela do Inventário */}
        <View style={TableStyles.table}>
          {/* Header */}
          <View style={[TableStyles.headerTable, { justifyContent: 'center', alignItems: 'center', }]} fixed>
            <View style={[TableStyles.headerCell, { width: ' 5%', }]}>
              <Text style={[{ fontFamily: 'OpenSansBold', fontSize: 6, color: '#ffffff', textAlign: 'center' }]}>ID</Text>
            </View>
            <View style={[TableStyles.headerCell, { width: ' 8%' }]}>
              <Text style={[{ fontFamily: 'OpenSansBold', fontSize: 6, color: '#ffffff', textAlign: 'center' }]}>Data</Text>
            </View>
            <View style={[TableStyles.headerCell, { width: ' 8%' }]}>
              <Text style={[{ fontFamily: 'OpenSansBold', fontSize: 6, color: '#ffffff', textAlign: 'center' }]}>Unidade</Text>
            </View>
            <View style={[TableStyles.headerCell, { width: ' 10%' }]}>
              <Text style={[{ fontFamily: 'OpenSansBold', fontSize: 6, color: '#ffffff', textAlign: 'center' }]}>Setor</Text>
            </View>
            <View style={[TableStyles.headerCell, { width: ' 10%' }]}>
              <Text style={[{ fontFamily: 'OpenSansBold', fontSize: 6, color: '#ffffff', textAlign: 'center' }]}>Processo</Text>
            </View>
            <View style={[TableStyles.headerCell, { width: ' 10%' }]}>
              <Text style={[{ fontFamily: 'OpenSansBold', fontSize: 6, color: '#ffffff', textAlign: 'center' }]}>Risco</Text>
            </View>
            <View style={[TableStyles.headerCell, { width: ' 5%' }]}>
              <Text style={[{ fontFamily: 'OpenSansBold', fontSize: 6, color: '#ffffff', textAlign: 'center' }]}>Tipo</Text>
            </View>
            <View style={[TableStyles.headerCell, { width: ' 12%' }]}>
              <Text style={[{ fontFamily: 'OpenSansBold', fontSize: 6, color: '#ffffff', textAlign: 'center' }]}>Consequência</Text>
            </View>
            <View style={[TableStyles.headerCell, { width: ' 10%' }]}>
              <Text style={[{ fontFamily: 'OpenSansBold', fontSize: 6, color: '#ffffff', textAlign: 'center' }]}>Fontes</Text>
            </View>
            <View style={[TableStyles.headerCell, { width: ' 5%' }]}>
              <Text style={[{ fontFamily: 'OpenSansBold', fontSize: 6, color: '#ffffff', textAlign: 'center' }]}>PE</Text>
            </View>
            <View style={[TableStyles.headerCell, { width: ' 10%' }]}>
              <Text style={[{ fontFamily: 'OpenSansBold', fontSize: 6, color: '#ffffff', textAlign: 'center' }]}>Avaliação</Text>
            </View>
            <View style={[TableStyles.headerCell, { width: ' 5%' }]}>
              <Text style={[{ fontFamily: 'OpenSansBold', fontSize: 6, color: '#ffffff', textAlign: 'center' }]}>Freq</Text>
            </View>
            <View style={[TableStyles.headerCell, { width: ' 10%' }]}>
              <Text style={[{ fontFamily: 'OpenSansBold', fontSize: 6, color: '#ffffff', textAlign: 'center' }]}>Medição</Text>
            </View>
            <View style={[TableStyles.headerCell, { width: ' 10%' }]}>
              <Text style={[{ fontFamily: 'OpenSansBold', fontSize: 6, color: '#ffffff', textAlign: 'center' }]}>Aparelho</Text>
            </View>
            <View style={[TableStyles.headerCell, { width: ' 5%' }]}>
              <Text style={[{ fontFamily: 'OpenSansBold', fontSize: 6, color: '#ffffff', textAlign: 'center' }]}>LT</Text>
            </View>
            <View style={[TableStyles.headerCell, { width: ' 10%' }]}>
              <Text style={[{ fontFamily: 'OpenSansBold', fontSize: 6, color: '#ffffff', textAlign: 'center' }]}>Metodologia</Text>
            </View>
            <View style={[TableStyles.headerCell, { width: ' 10%' }]}>
              <Text style={[{ fontFamily: 'OpenSansBold', fontSize: 6, color: '#ffffff', textAlign: 'center' }]}>Medidas</Text>
            </View>
            <View style={[TableStyles.headerCell, { width: ' 10%' }]}>
              <Text style={[{ fontFamily: 'OpenSansBold', fontSize: 6, color: '#ffffff', textAlign: 'center' }]}>Conclusão</Text>
            </View>
          </View>
          {/* Body */}
          {inventario.map((item, i) => (
            <View key={i} style={TableStyles.contentTable} wrap={false}>
              <View style={[TableStyles.contentCell, { width: '5%' }]}>
                <Text style={[RiskInventoryStyles.contentText, { textAlign: 'center', }]}>
                  {item.id_inventario || ''}
                </Text>
              </View>
              <View style={[TableStyles.contentCell, { width: '8%' }]}>
                <Text style={[RiskInventoryStyles.contentText, { textAlign: 'center', }]}>
                  {formatData(item.data_inventario) || 'N/A'}
                </Text>
              </View>
              <View style={[TableStyles.contentCell, { width: '8%' }]}>
                <Text style={[RiskInventoryStyles.contentText, { textAlign: 'left', }]}>
                  {find(item.fk_unidade_id, 'nome_unidade')}
                </Text>
              </View>
              <View style={[TableStyles.contentCell, { width: '10%' }]}>
                <Text style={[RiskInventoryStyles.contentText, { textAlign: 'left', }]}>
                  {find(item.fk_setor_id, 'nome_setor')}
                </Text>
              </View>
              <View style={[TableStyles.contentCell, { width: '10%' }]}>
                <Text style={[RiskInventoryStyles.contentText, { textAlign: 'left', }]}>
                  {find(item.fk_processo_id, 'nome_processo')}
                </Text>
              </View>
              <View style={[TableStyles.contentCell, { width: '10%' }]}>
                <Text style={[RiskInventoryStyles.contentText, { textAlign: 'left', }]}>
                  {find(item.fk_risco_id, 'nome_risco') || 'N/A'}
                </Text>
              </View>
              <View style={[TableStyles.contentCell, { width: '5%' }]}>
                <Text style={[RiskInventoryStyles.contentText, { textAlign: 'center', }]}>
                  {find(item.fk_risco_id, 'grupo_risco') || 'N/A'}
                </Text>
              </View>
              <View style={[TableStyles.contentCell, { width: '12%' }]}>
                <Text style={[RiskInventoryStyles.contentText, { textAlign: 'left', }]}>
                  {find(item.fk_risco_id, 'consequencia') || 'N/A'}
                </Text>
              </View>
              <View style={[TableStyles.contentCell, { width: '10%' }]}>
                <Text style={[RiskInventoryStyles.contentText, { textAlign: 'left', }]}>
                  {item.fontes || 'N/A'}
                </Text>
              </View>
              <View style={[TableStyles.contentCell, { width: '5%' }]}>
                <Text style={[RiskInventoryStyles.contentText, { textAlign: 'center', }]}>
                  {item.pessoas_expostas || 'N/A'}
                </Text>
              </View>
              <View style={[TableStyles.contentCell, { width: '10%' }]}>
                <Text style={[RiskInventoryStyles.contentText, { textAlign: 'center', }]}>
                  {find(item.fk_risco_id, 'avaliacao') || 'N/A'}
                </Text>
              </View>
              <View style={[TableStyles.contentCell, { width: '5%' }]}>
                <Text style={[RiskInventoryStyles.contentText, { textAlign: 'left', }]}>
                  {item.frequencia || '0'}
                </Text>
              </View>
              <View style={[TableStyles.contentCell, { width: '10%' }]}>
                <Text style={[RiskInventoryStyles.contentText, { textAlign: 'center', }]}>
                  {item.medicao + " " + find(item.fk_risco_id, 'unidade_medida') || '0'}
                </Text>
              </View>
              <View style={[TableStyles.contentCell, { width: '10%' }]}>
                <Text style={[RiskInventoryStyles.contentText, { textAlign: 'left', }]}>
                  {find(item.fk_aparelho_id, 'nome_aparelho') || 'N/A'}
                </Text>
              </View>
              <View style={[TableStyles.contentCell, { width: '5%' }]}>
                <Text style={[RiskInventoryStyles.contentText, { textAlign: 'center', }]}>
                  {find(item.fk_risco_id, 'limite_tolerancia') + " " + find(item.fk_risco_id, 'unidade_medida') || '0'}
                </Text>
              </View>
              <View style={[TableStyles.contentCell, { width: '10%' }]}>
                <Text style={[RiskInventoryStyles.contentText, { textAlign: 'left', }]}>
                  {find(item.fk_risco_id, 'metodologia') || 'N/A'}
                </Text>
              </View>
              <View style={[TableStyles.contentCell, { width: '10%' }]}>
                <Text style={[RiskInventoryStyles.contentText, { textAlign: 'left', }]}>
                  {convertMedidas(item.medidas) || 'N/A'}
                </Text>
              </View>
              <View style={[TableStyles.contentCell, { width: '10%' }]}>
                <Text style={[RiskInventoryStyles.contentText, { textAlign: 'left', }]}>
                  {item.conclusao_lp || '-'}
                </Text>
              </View>
            </View>
          ))}
        </View>

        {/* Footer */}
        <FooterPage />
      </Page>
    );
  };

  const MyDocument = () => {
    return (
      <Document>
        <CoverPage />
        {/* <SumaryPage /> */}
        <CompanyPage />
        <IntroductionPage />
        <IntroductionPageContinue />
        <IntroductionPageContinueTwo />
        <ObjectivePage />
        <ObjectivePageContinue />
        <UnidadesPage />
        <PostPage />
        <RiskInventoryPage />
      </Document>
    );
  };

  return MyDocument();
}

export default PericulosidadeGenerate;
